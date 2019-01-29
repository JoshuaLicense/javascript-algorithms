import LinkedList from "./LinkedList";

const tableSize = 32;

class HashTable {
  constructor(size = tableSize) {
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList());

    // Map of the keys.
    this.keys = {};
  }

  hash(key) {
    return (
      Array.from(key).reduce((acc, curr) => acc + curr.charCodeAt(0), 0) %
      this.buckets.length
    );
  }

  has(key) {
    // Why not this.keys[key] or this.keys.hasOwnProperty?
    // --
    // this.keys[key] will check on the prototype.
    // So if key === "map" this will WRONGLY return true.
    // --
    // this.keys.hasOwnProperty(key), like the above can still be modifed if a key is named "hasOwnProperty".
    return Object.hasOwnProperty(this.keys, key);
  }

  set(key, value) {
    const hash = this.hash(key);

    this.keys[key] = hash;

    const bucketList = this.buckets[hash];

    // Find the node for this key, if it exists.
    const node = bucketList.find({
      callback: ({ nodeValue }) => nodeValue.key === key
    });

    if (node) {
      // Exists then update the value.
      node.value.value = { key, value };
    } else {
      // Otherwise add it to the list.
      bucketList.append({ key, value });
    }
  }

  get(key) {
    const hash = this.hash(key);

    const bucketList = this.buckets[hash];

    const node = bucketList.find({
      callback: ({ nodeValue }) => nodeValue.key === key
    });

    return node ? node.value.value : undefined;
  }
}
