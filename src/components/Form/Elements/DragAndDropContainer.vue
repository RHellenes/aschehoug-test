<template>
    <div class="drag-and-drop"
        @dragenter.prevent="setDragActive" 
        @dragleave.prevent="setDragInactive" 
        @dragover.prevent="setDragActive" 
        @drop.prevent="captureFile"
      >
      <slot />
      <div class="drag-and-drop__container" v-if="dragActive" :aria-hidden="true">
        <p class="drag-and-drop__container--allowed" v-if="isTypeAllowed"> Slipp filen for å laste opp</p>
        <p class="drag-and-drop__container--disallowed" v-else> Filtypen er ikke tillatt</p>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fileTypeGuard } from '@/utils/helpers'
interface IProps {
  allowedFileTypes?: string[]
}
const props = defineProps<IProps>()
interface IEmit {
  (e: 'update', file: File): void
}
const emit = defineEmits<IEmit>()
// ref for visually showing if dragover is active
const dragActive = ref(false)
// ref for visually showing if file type is allowed or not
const isTypeAllowed = ref(true)

const setDragActive = (event:DragEvent) => {    
  dragActive.value = true
  const itemType = event.dataTransfer?.items[0].type || null
  isTypeAllowed.value = !event.dataTransfer ? fileTypeGuard(props.allowedFileTypes || [], itemType) : false
}

// reset visual feedback for drag and drop
const setDragInactive = () => {
  dragActive.value = false
  isTypeAllowed.value = true
}

// handle file drop
const captureFile = (event: DragEvent) => {
  // Remove drag active class
  setDragInactive()
  const itemType = event.dataTransfer?.items[0].type || null

  // Check if file is allowed
  if(!fileTypeGuard(props.allowedFileTypes || [], itemType)) return
  const files = event.dataTransfer?.files
  if (files) {
    emit('update', files[0])
  }

  // TODO: handle possible errors. 
}
  
</script>

<style scoped>
.drag-and-drop{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.drag-and-drop__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .8;
}
.drag-and-drop__container--allowed {
  color: #000;
  background-color: #fff;
  border: 2px dashed #000;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.drag-and-drop__container--disallowed {
  color: #fff;
  background-color: #611212;
  border: 2px dashed #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

}
</style>