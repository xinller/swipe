<template>
	<div class="check-list-container">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
			<van-list v-model="loading" :finished="finished" :finished-text="noData ? '' : '没有更多'" @load="onLoad" :offset="130">
				<div class="size-12 c-gray p-10 ">
					所有关于返款未到账的问题,请联系平台客户处理,请勿擅自退款,不能旺旺骚扰商家,否则封号处理,谢谢配合
				</div>
				<van-empty description="暂无数据" v-if="noData" />
				<div class="com-shop-box" v-for="item in dataList" :key="item.id">
					<div class="com-shop-top">
						<span>任务编号:{{ item.order_code }}</span>
						<span @click="showImage(item)">{{ format_status(item.status, item.is_trans) }}</span>
					</div>
					<div class="com-shop-card">
						<img :src="item.goods_image" class="thumb" />
						<div class="content">
							<div class="middle">
								<div class="top-img">
									<img src="../../assets/image/task/taobao.png" class="tb-icon" />
									<span class="username">{{ item.taobao_nickname }}</span>
								</div>
								<p class="san">应返金额: {{ item.pay_amount }}</p>
								<p class="pre-pay" v-if="item.seller_account_name && item.trans_type == 0">
									【返款户名:{{ item.seller_account_name }}】<br />
									<span class="c-red">
										实际返额: {{ item.actual_payment }}
										(银行返)
									</span>
								</p>
								<p class="pre-pay" v-if="item.trans_type == 1">
									<span class="c-red">
										实际返额: {{ item.actual_payment }}
										(微信返)
									</span>
								</p>
								<p class="pre-pay">预计到账:{{ item.update_time }}</p>
							</div>
							<div class="right" style="text-align:right">
								<van-button
									:disabled="isDisabled"
									type="default"
									size="mini"
									v-if="item.status == 0 && item.is_trans == 1"
									@click="toNotReceive(item)"
									>未到账</van-button
								>
								<van-button
									@click="setReceive(item)"
									:disabled="isDisabled2"
									type="info"
									size="mini"
									v-if="item.status == 0 && item.is_trans == 1"
									>确认收款</van-button
								>

								<van-button size="mini" :disabled="isDisabled" type="default" v-if="item.status == 3" @click="toServe"
									>联系客服</van-button
								>
								<van-button size="mini" @click="setReceive(item)" :disabled="isDisabled2" type="info" v-if="item.status == 3"
									>确认收款</van-button
								>
							</div>
						</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
		<van-dialog v-model="show_img" title="卖家返款证明">
			<div class="txt-ct">
				<div class="size-14 p-15 c-primary">转出用户名:{{ seller_account_name }}</div>
				<img :src="refund_img" style="width:90%" />
			</div>
		</van-dialog>
	</div>
</template>

<script>
import * as api from '@/api/api'
import { concat } from 'lodash'
export default {
	name: 'back-record',
	props: {
		status: {
			type: Number,
		},
	},
	watch: {
		status(val) {
			console.log('val', val)
			if (val == 0) {
				this.type = ''
			} else {
				this.type = val
			}
			this.onRefresh()
		},
	},
	data() {
		return {
			show_img: false,
			dataList: [],
			type: this.status,
			loading: false, // true 转圈圈
			finished: false, //是否请求结束 结束显示 没有更多
			noData: false, //如果没有数据 显示暂无
			refreshing: false, //是否下拉刷新
			page: 1,
			rows: 10,
			isDisabled: false,
			isDisabled2: false,
			refund_img: '',
			seller_account_name: '',
		}
	},
	mounted() {
		console.log(this.status)
		if (this.status == 0) {
			this.type = ''
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		toServe() {
			this.$router.push({ name: 'server' })
		},
		// is_trans 0-待转账 1-已转账 2转失败
		//  status 0-未转账 1-返款 2-未到账反馈 3-买家已返款 4-客服退款
		format_status(status, is_trans) {
			if (status == 0 && is_trans == 0) {
				return '等待转账'
			} else if (status == 0 && is_trans == 1) {
				return '已转账'
			} else if (status == 0 && is_trans == 2) {
				return '转账失败'
			} else if (status == 0) {
				return '未转账反馈'
			} else if (status == 2 && is_trans == 1) {
				return '未到账反馈'
			} else if (status == 1 && is_trans == 1) {
				return '已完成'
			} else if (status == 3) {
				return '查看转账截图'
			} else if (status == 4) {
				return '已退款'
			}
		},
		showImage(item) {
			console.log('item', item)
			if (item.status == 3) {
				this.refund_img = item.refund_certificate
				this.seller_account_name = item.seller_account_name
				this.show_img = true
			}
		},
		toNotReceive(item) {
			this.isDisabled = true
			api.notReceive({ id: item.id }).then((res) => {
				this.isDisabled = false
				if (res.success) {
					this.$toast('反馈成功,等待卖家处理')
					this.onRefresh()
				}
			})
		},
		setReceive(item) {
			this.isDisabled2 = true
			api.setReceive({ id: item.id }).then((res) => {
				this.isDisabled2 = false
				if (res.success) {
					this.$toast('提交成功')
					this.onRefresh()
				}
			})
		},
		getData() {
			// 请求
			api
				.transferList({
					page: this.page,
					rows: this.rows,
					type: this.type,
				})
				.then((res) => {
					if (res.success) {
						// 结束加载
						this.loading = false
						if (res.data.length > 0) {
							this.dataList = concat(this.dataList, res.data)
							this.page++
						} else {
							this.finished = true
						}
						// 没有数据显示暂无
						if (this.dataList.length === 0 && this.page === 1) {
							this.noData = true
						}
					}
				})
		},
		// 列表加载
		onLoad() {
			setTimeout(() => {
				this.getData()
				this.loading = true
			}, 500)
		},
		onRefresh() {
			// 清空列表数据
			setTimeout(() => {
				this.refreshing = false
				this.dataList = []
				this.page = 1
				this.loading = false
				this.finished = false
				this.noData = false
			}, 500)
		},
	},
}
</script>

<style scoped lang="less">
body {
	background: #fff;
}
.change-record .record-list .list-body {
	display: flex;
	align-items: center;
}
</style>
