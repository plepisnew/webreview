<template>
  <div class="filter-bar">
    <div class="filter-input">
      <TextField
        class="tag-input"
        :handler="this.addTag"
        placeholder="Enter tags (e.g. YouTube, newUser, October)"
        ref="inputRef"
      />
      <Button text="Search" :onClick="() => handler(tags)" />
    </div>
    <div class="filter-tags">
      <div class="tag" v-for="tag in tags" :key="tag">
        <span class="tag-name">{{ tag }}</span>
        <div class="remove-tag" @click="() => removeTag(tag)">
          &#10060;
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Handler should be in the form (tags) => callback(tags), allowing you to handle selected tags in any way -->
<script>
import TextField from '@/components/TextField'
import Button from './Button.vue'
export default {
  name: 'FilterBar',
  components: {
    TextField,
    Button
  },
  data() {
    return {
      tags: ['all']
    }
  },
  methods: {
    addTag() {
      const tag = this.$refs.inputRef.$el.value
      if (!this.tags.includes(tag) && tag) {
        this.tags.push(tag)
        this.$refs.inputRef.$el.value = ''
      }
    },
    removeTag(tag) {
      this.tags = this.tags.filter(arrTag => arrTag !== tag)
    }
  },
  props: {
    handler: Function
  }
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tag-input {
  flex: 1;
}

.filter-input {
  display: flex;
  align-items: stretch;
  gap: 5px;
}

.filter-tags {
  display: flex;
  gap: 10px;
  max-width: 100%;
  flex-wrap: wrap;
  /* max-height: 100px;
  overflow-y: scroll; */
}

.tag {
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.tag-name {
  font-weight: 600;
}

.remove-tag {
  display: inline-block;
  font-size: 8px;
  cursor: pointer;
}

.remove-tag:hover > .tag {
  opacity: 0.8;
}
</style>
