<template>
  <Page>
    <ActionBar>
      <Label text="Home" />
    </ActionBar>

    <AbsoluteLayout>
      <ListView >
        <ListView>
          <Label text="label text"></Label>
        </ListView>
      </ListView>

      <GridLayout id="btnFab" @tap="onButtonTap"> </GridLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script>
export default {
  computed: {
    message() {
      return "Blank {N}-Vue app";
    },
  },
};
</script>

<style scoped lang="scss">
#btnFAB {
  width: 56;
  height: 56;
  background-color: orangered;
  border-radius: 28;
}
</style>
