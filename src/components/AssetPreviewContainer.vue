<template>
  <div class="preview-container" :class="file && 'preview-container--uploaded'">
    <div style="overflow: hidden;">
      
      <div class="preview-container__placeholder" v-if="!file">
        Ingen video valgt 
      </div>
      
      
      <Transition name="fade">
        <div class="file__preview-area" ref="filePreviewArea" v-show="!!file"></div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
interface IProps {
  file: File | null
}
const props = defineProps<IProps>()
const filePreviewArea = ref<HTMLElement | null>(null)

watch(() => props.file, () => {
  handleFilePreview()
})
const handleFilePreview = async () => {
try {
  if (props.file) {
    // make sure file size is less than 10mb
    const reader = new FileReader()
    console.log(reader);
    console.log(filePreviewArea.value);
    
    reader.readAsDataURL(props.file)
    reader.onload = () => {
      if (filePreviewArea.value) {
        filePreviewArea.value.innerHTML = `
          <video controls class="file__preview-area__video">
            <source src="${reader.result}" type="${props.file.type}">
          </video>
        `
      }
    }
  }
} catch (error) {
  console.error(error);
  
}
}
</script>
<style>

.preview-container {
  min-height: 10rem;
  width: 100%;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  padding: var(--spacer-4);
  grid-template-rows: 0fr;
  transition: grid-template-rows 5s ease-in-out;
}
.preview-container--uploaded {
  grid-template-rows: 1fr;
  border: 2px solid rgba(229, 229, 229, 0.5)  
}
.preview-container__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  color: #e5e5e5;
}

.file__preview-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.file__preview-area__video{
  width: 100%;
}
.fade {
 /* opacity: 1; */
}
.fade-enter-active {
  transition: opacity .5s ease;
  transition-delay: .2s;

}
.fade-leave-active {
  transition: opacity 0s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>