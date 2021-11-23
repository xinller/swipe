<template>
    <div>
        <van-nav-bar title="新手教学" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page">
            <van-collapse v-model="activeName" accordion class="novice-teach">
                <van-collapse-item :title="item.title" :name="index" v-for="(item, index) in dataList" :key="index">
                    <p class="size-12" @click="toDetail(index)" v-html="item.content"></p>
                    <!-- <p class="size-12">2、内容</p> -->
                </van-collapse-item>
                <!-- <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
                <van-collapse-item title="标题3" name="3">内容</van-collapse-item> -->
            </van-collapse>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'novice-teach',
    data() {
        return {
            activeName: 0,
            isLoading: false,
            dataList: [],
        }
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
        toDetail(index) {
            this.activeName = index
            this.$router.push({ name: 'teach-detail', query: { id: this.dataList[index]['id'] } })
        },
        onRefresh() {
            api.novice().then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.dataList = res.data
                }
            })
        },
    },
}
</script>

<style></style>
