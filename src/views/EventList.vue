<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="时间"
                    width="120">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteEvent(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            edit(row) {
                console.log(row);
                this.$router.push({
                    path: '/eventupdate',
                    query: {
                        id: row.id
                    }
                })
                //row.id
            },
            deleteEvent(row){
                //alert(row)
                const _this = this;
                axios.delete("http://localhost:9999/event/deleteById/"+row.id).then(function (resp) {
                    console.log(resp.msg)
                    if(resp.data.msg == "删除成功"){
                        _this.$alert('已删除编号为'+row.id+"的事件", '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                window.location.reload();
                            }
                        });
                    }
                    window.location.reload()
                })
            },
            page(currentPage) {
                //alert(currentPage);
                const _this = this;
                axios.get("http://localhost:9999/event/findAll/"+(currentPage-1)+"/4").then(function (resp) {
                    //console.log(resp)
                    _this.tableData = resp.data.data.eventData.content;
                    _this.pageSize = resp.data.data.eventData.size;
                    _this.total = resp.data.data.eventData.totalElements;
                })
            }
        },
        data() {
            return {
                pageSize: '',
                total: '',
                tableData:[
                    {
                        id:1,
                        type:"雷电",
                        time:"2010"
                    }
                ]
            }
        },
        created()
            {
                const _this = this;
                axios.get("http://localhost:9999/event/findAll/0/4").then(function (resp) {
                    //console.log(resp)
                    _this.tableData = resp.data.data.eventData.content;
                    _this.pageSize = resp.data.data.eventData.size;
                    _this.total = resp.data.data.eventData.totalElements;
                })
            }
        }
</script>