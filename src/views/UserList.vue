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
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="3"
                :total="30"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick(row) {
                console.log(row);
            },
            page(currentPage) {
                alert(currentPage);
            }
        },

        data() {
            return {
                tableData: [{
                    id: '1',
                    name: '王小虎'
                }, {
                    id: '2',
                    name: '王小虎'
                }, {
                    id: '3',
                    name: '王小虎'
                }]
            }
        }
    }
</script>