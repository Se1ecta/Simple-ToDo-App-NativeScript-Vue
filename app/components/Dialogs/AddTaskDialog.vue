<template>
  <Page>
    <ActionBar title="Detail" />
   
    <GridLayout rows="auto, *" columns="" class="container">
      <TextField text="title" hint="title" row="0" v-model="task.title" />
      <Button text="add" row="1" @tap="addTask"></Button>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  props: ["id"],
  data(){
    return{
        task:{
          title:'',
          completed: false
        }
    }
  },
  methods:{
    addTask(){
      this.$modal.close(this.task)

    }
  }
};
</script>

<style lang="scss" scoped>
.container{
    width: 220;
    height: 130;
    border-radius: 15;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 15;
    padding: 20 10;
}
.task-title{
    width: 100%;
    padding: 5;
}
</style>></style>
