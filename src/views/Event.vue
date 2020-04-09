<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td>类型</td>
                <td>时间</td>
            </tr>
            <tr v-for="item in data">
                <td>{{item.id}}</td>
                <td>{{item.type}}</td>
                <td>{{item.time}}</td>
            </tr>
        </table>
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: "Event",
        data(){
            return {
                msg:"Hello Vue",
                data:[
                    {
                        id:1,
                        type:"雷电",
                        time:"2010"
                    },
                    {
                        id:2,
                        type:"台风",
                        time:"2009"
                    },
                    {
                        id:3,
                        type:"爆炸",
                        time:"2008"
                    }
                ]
            }
        },
        created() {
            const _this = this
            axios.get("http://localhost:9999/event/findAll").then(function (resp) {
                //console.log(resp)
                _this.data = resp.data.data.eventData
            })
        }
    }
</script>

<style scoped>

</style>