console.log("ngu");
let list1 = [1, 2, 4],
  list2 = [1, 3, 4];
var mergeTwoLists = function (list1, list2) {
  return list1.concat(list2).sort((a, b) => (a > b ? 1 : -1));
};
console.log(mergeTwoLists(list1, list2));
