<template>
  <Page>
    <ActionBar>
      <Label text="Home" />
    </ActionBar>
    <GridLayout class="todo" padding="20 15" rows="auto, *">
      <Label v-if="!tasks.length" fontSize="24" color="white"> Нет задач</Label>
      <ListView
        for="item in tasks"
        @itemTap="onItemTap"
        class="task-list"
        separatorColor="transparent"
        row="1"
      >
        <v-template>
          <StackLayout @tap="onButtonTap">
            <FlexboxLayout 
              rows="auto, auto"
              columns="*, auto"
              class="task-container"
              justifyContent="space-between"
            >
              <Label col="0" :text="item.title" fontSize="24" />
              <check-box
                col="1"
                :checked="item.completed"
                
              />
            </FlexboxLayout >
          </StackLayout>
        </v-template>
      </ListView>
      <fab
        @tap="showDialog"
        row="1"
        icon="~/assets/icons/plus.png"
        rippleColor="#f1f1f1"
        class="fab-button"
      ></fab>
    </GridLayout>
  </Page>
</template>

<script>
import AddTaskDialog from "./Dialogs/AddTaskDialog.vue";
// import { ApplicationSettings } from "@nativescript/core";
// import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      tasks:[]
    };
  },
  computed: {
    // ...mapGetters(["tasks"])
  },
  methods: {
    // ...mapActions(["getAllTasks", "save"]),
    showDialog() {
      const options = {
        context: { promptMsg: "This is the prompt message!" },
        animated: true,
        props: { id: 1 },
      };
      this.$showModal(AddTaskDialog, options).then((task) => {
        if (task.title === "") {
          return;
        }
        this.tasks.push(task)
        this.getCompletedTasks()
      });
    },

    getCompletedTasks(){
      const tem = this.tasks.filter((task)=>{
        return task.completed
      })
      console.log(tem)
    },

    getTastk() {},
  },

  mounted() {

  },
};
</script>

<style scoped lang="scss">
.fab-button {
  height: 70;
  width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 15;
  background-color: #ff4081;
  horizontal-align: right;
  vertical-align: bottom;
}
.todo {
  background: rgb(53, 164, 220);
}
.task-container {
  display: flex;
  justify-content: center;
  height: 50;
  border-radius: 15;
  background: white;
  padding: auto 10;
  margin-bottom: 3;
}
.todo-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20 20;
  margin-bottom: 10;
  &:last-child {
    margin-bottom: 0;
  }
}
.add-btn {
  width: 56;
  height: 56;
  background-color: rgb(191, 13, 245);
  border-radius: 50%;
  bottom: 200;
  right: 80;
}
.task-list {
  width: 100%;
  height: 100%;
}
</style>
