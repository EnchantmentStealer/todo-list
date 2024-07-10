export function addTodoItem(list, item) {
  list.push(item);
  item.index = list.length - 1;
}

export function removeTodoItem(list, index) {
  list.splice(index, 1);
}

export function changeItemPriority(list, index) {
  if (list[index].priority === "high") {
    list[index].priority = "low";
  } else {
    list[index].priority = "high";
  }
}