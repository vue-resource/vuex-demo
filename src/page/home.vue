<template>
	<div>
		<span class="color-primary">CSS4,预见未来</span>
		<div>{{rate}}</div>
		<el-button type="primary" size="small" @click="add(10)">增加</el-button>
		<el-button type="success" size="small" @click="sub(11)">减少</el-button>
		<el-button type="plain" size="small" round @click="showDel">展示详情</el-button>
	</div>
</template>

<script type="text/javascript">
  import {mapActions, mapState,mapGetters} from 'vuex'
  export default {
    name: "home",
    computed: {
      ...mapState({
      	'total': ({test}) => test.total 
      }),
      ...mapGetters(['rate'])
    },
    methods: {
      showDel () {
      	console.log(this.$store)
      },
      ...mapActions(['add', 'sub'])
    }
  }
</script>
