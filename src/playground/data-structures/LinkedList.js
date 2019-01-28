import LinkedListNode from "./LinkedListNode";

class LinkedList {
  constructor() {
    this.head = null;

    this.tail = null;
  }

  append(value) {
    const node = new LinkedListNode(value);

    if (!this.head) {
      this.head = this.tail = node;

      return this;
    }

    this.tail.next = node;

    this.tail = node;

    return this;
  }

  prepend(value) {
    if (!this.head) {
      this.head = this.tail = node;

      return this;
    }

    const node = new LinkedListNode(value, this.head);

    this.head = node;

    return this;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      if (callback && callback(currentNode)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  reverse() {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    // This is effect works backwords. CurrentNode = PrevNode.
    while (currentNode) {
      // Store the next node to keep the chain.
      // This allows us to modify the chain, but maintain the loop.
      nextNode = currentNode.next;

      // Make the prev node the next nude in the chain.
      // Now effectively reverse the chain. The first prevNode is null, signifies the tail.
      currentNode.next = prevNode;

      // Assigned the previous node to the current node in the chain.
      // This allows the code to work in reverse.
      // The next loop iteration, the prevNode is assigned to the next in the loop as next.
      prevNode = currentNode;

      // Continue the loop with the previously saved nextNode.
      currentNode = nextNode;
    }
  }

  reverse2() {
    let currentNode = this.head;

    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      // Save the next node to allow looping.
      nextNode = currentNode.next;

      // Reverse the pointer!
      currentNode.next = prevNode;

      // Move the pointers one position ahead.
      prevNode = currentNode;
      currentNode = nextNode;
    }

    // Fix the tail and head.
    this.tail = this.head;

    this.head = prevNode;

    return this;
  }
}
