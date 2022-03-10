<template>
  <Page>
    <ActionBar>
      <Label text="Add task" />
    </ActionBar>

    <StackLayout padding="20 10" width="300" height="360">
      <StackLayout width="100%" marginBottom="10">
        <Label
          text="Добавить задачу"
          textAlignment="center"
          fontSize="24"
        ></Label>
      </StackLayout>
      <StackLayout class="form-group">
        <Label text="Название" fontSize="18"></Label>
        <TextField
          v-model="task.title"
          fontSize="14"
          class="input"
          marginTop="5"
          hint="Введите название"
        />
      </StackLayout>
      <StackLayout class="form-group" height="120">
        <Label text="Описание" fontSize="18"></Label>
        <TextField
          v-model="task.description"
          fontSize="14"
          class="text-area"
          height="100%"
          hint="Введите опиание"
        />
      </StackLayout>

      <Button
        text="Добавить"
        @tap="addTask"
        marginTop="30"
        class="btn-primary"
      ></Button>
    </StackLayout>
  </Page>
</template>

<script>
import { random } from "../../helpers/random";
export default {
  props: ["id"],
  data() {
    return {
      task: {
        id: null,
        title: "",
        description: "",
        completed: false,
      },
    };
  },
  methods: {
    addTask() {
      this.task.id = random();
      this.$modal.close(this.task);
    },
  },
};
</script>

<style lang="scss" scoped>
TextField {
  margin: 0;
  border-bottom-color: transparent;
}

.container {
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
</style>>
