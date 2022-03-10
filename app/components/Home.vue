<template>
  <Page>
    <ActionBar>
      <Label text="ToDo" />
    </ActionBar>
    <GridLayout class="todo" padding="20 15" rows="auto, *">
      <ScrollView orientation="horizontal" height="70" width="100%">
        <StackLayout orientation="horizontal">
          <Button
            v-for="(filter, index) in filters"
            :text="filter.title"
            :key="index"
            @tap="addActiveClass(index)"
            :class="filter.active ? 'active' : ''"
            margin="0"
          >
          </Button>
        </StackLayout>
      </ScrollView>

      <StackLayout v-if="filteredTasks.length" row="1">
        <ListView
          for="item in filteredTasks"
          @itemTap="onItemTap"
          class="task-list"
          separatorColor="transparent"
        >
          <v-template>
            <StackLayout v-for="(filter, index) in filteredTasks" :key="index">
              <FlexboxLayout
                rows="auto, auto"
                columns="*, auto"
                class="task-container"
                justifyContent="space-between"
                @tap="editTask(item)"
              >
                <Label col="0" :text="item.title" fontSize="24" />
                <check-box
                  col="1"
                  :checked="item.completed"
                  @checkedChange="completeTask($event, item)"
                />
              </FlexboxLayout>
            </StackLayout>
          </v-template>
        </ListView>
      </StackLayout>
      <StackLayout v-else row="1">
        <Label text="Нет задач" color="white" fontSize="18"></Label>
      </StackLayout>
      <Fab
        @tap="showDialog"
        icon="~/assets/icons/plus.png"
        color="white"
        row="1"
        rippleColor="#f1f1f1"
        class="fab-button fas"
        stretch="none"
      >
      </Fab>
    </GridLayout>
  </Page>
</template>

<script>
import AddTaskDialog from "./Modals/AddTaskModal";
import EditTaskModal from "./Modals/EditTaskModal.vue";
import { TaskService } from "../services/task-service";
import { ApplicationSettings } from "@nativescript/core";

export default {
  data() {
    return {
      selectedIndex: null,
      tasks: TaskService.getAllTasks(),
      activeFilter: 1,
      filters: [
        { id: 1, title: "All tasks", active: true },
        { id: 2, title: "Completed tasks", active: false },
        { id: 3, title: "Uncompleted tasks", active: false },
      ],
    };
  },
  computed: {
    filteredTasks() {
      switch (this.activeFilter) {
        case 1: {
          return this.tasks;
        }
        case 2: {
          return this.getCompletedTasks();
        }
        case 3: {
          return this.getUnCompletedTasks();
        }
        default: {
          console.log(`Invalid filter ${filter}`);
        }
      }
    },
  },
  methods: {
    async showDialog() {
      const options = {
        // fullscreen: true,
        title: "Add task",
        animated: true,
        props: { id: 1 },
      };
      await this.$showModal(AddTaskDialog, options)
        .then((task) => {
          if (task.title === "") {
            return;
          }
          this.tasks.push(task);
          TaskService.setTasks(this.tasks);
        })
        .cath((err) => {
          console.log(err);
        });
    },
    completeTask(event, item) {
      item.completed = event.value;

      TaskService.updateItem(item.id, item);
    },

    getCompletedTasks() {
      const completedTasks = this.tasks.filter(
        (task) => task.completed === true
      );
      return completedTasks;
    },

    getUnCompletedTasks() {
      const unCompletedTasks = this.tasks.filter(
        (task) => task.completed === false
      );
      return unCompletedTasks;
    },
    async editTask(task) {
      const options = {
        // fullscreen: true,
        title: "Edit task",
        animated: true,
        props: { task },
      };
      await this.$showModal(EditTaskModal, options)
        .then(() => {
          this.tasks = TaskService.getAllTasks();
        })
        .cath((err) => {
          console.log(err);
        });
    },

    addActiveClass(i) {
      this.clearActiveFilters();
      this.filters.forEach((filter, index) => {
        if (i === index) {
          this.activeFilter = filter.id;
        }
        return (filter.active = i === index);
      });
    },
    clearActiveFilters() {
      this.filters.forEach((filter) => {
        filter.active = false;
      });
    },
  },

  mounted() {
    // ApplicationSettings.clear()
  },
};
</script>

<style scoped lang="scss">
.active {
  color: red;
}
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
  border-radius: 5;
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
