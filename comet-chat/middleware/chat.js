export default ({ store, redirect }) => {
  if(!Object.keys(store.state.user).length) {
    redirect('/?msg=noUser')
  }
}
