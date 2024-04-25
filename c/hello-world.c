#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
  int data; // 数据
  struct Node *next; // 指针
}Node;

// 链表初始化
Node *list_init(void) {
  Node *head = (Node *)malloc(sizeof(Node));
  if(head != NULL) {
    head->data = 0;
    head->next = NULL;
  }
  
  return head;
}

// 添加节点
Node *list_add(Node *head, int data) {
  Node *node = (Node *)malloc(sizeof(Node));
  if(node != NULL) {
    node->data = data;
    node->next = head->next;
    head->next = node;
  }
  
  return head;
}

// 删除节点
Node *list_del(Node *head, int data) {
  Node *node = head->next;
}

// 打印链表
void list_print(Node *head) {
  Node *node = head->next;
  while(node != NULL) {
    printf("%d\n", node->data);
    node = node->next;
  }
}

int main(){
  Node *list = list_init();
  if(list == NULL) {
    return 0;
  };
  list_add(list, 1);
  list_add(list, 2);
  list_add(list, 3);
  list_print(list);
  return 0;
}