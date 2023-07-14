<template>
  <form>
    <fieldset class="file">
      <div class="file__legend">
        <legend >Last opp video</legend>
      </div>
      <div class="file__content">
        <DragAndDropContainer :allowed-file-types="allowedFileTypes" @update="(newFile) => file  = newFile">

          <!-- start preview -->
          <AssetPreviewContainer :file="file" />
          <!-- end preview -->

          <div class="file__bottom-container">
            <div>
              <p>Filnavn: {{ file?.name + ' | ' + shortenByteAndAddUnit(file?.size) || '' }}</p>
            </div>
            <div class="file__bottom-container__button-group">
              
              <label 
              for="file__input"
              class="button" 
              >
              <span> Velg fil </span>
            </label>
            <input type="file" class="sr-only" id="file__input" @change="handleFileChange" :placeholder="file ? file.name : 'Ingen fil valgt'" :accept="allowedFileTypes.join(', ')"/>
            <button class="button button--secondary file__reset"  @click.prevent="file = null">Fjern video</button>
          </div>
        </div>
      </DragAndDropContainer> 
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DragAndDropContainer from '@/components/Form/Elements/DragAndDropContainer.vue';
import AssetPreviewContainer from '@/components/Form/Elements/AssetPreviewContainer.vue';
import { shortenByteAndAddUnit } from '@/utils/helpers';

interface IProps {
  allowedFileTypes?: string[]
  maxFileSize?: number
}
withDefaults(defineProps<IProps>(), {
  allowedFileTypes: () => ['video/mp4'], // default to mp4
  maxFileSize: () => 10 * 1024 * 1024 // 10mb
})

const file = ref<File | null>(null)




const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if(!target.files) return // give user feedback?
  const files = target.files
  file.value = files[0]
}

</script>

<style scoped>
.file {
  border: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacer-4);
  grid-template-rows: min-content;
  grid-auto-flow:column;
  justify-items: start;
}
.file__legend {
  grid-column: 1 / span 12;
  font-size: 1.5rem;
  display: block;
  width: 100%;
}

.file__content {
  grid-column: 1 / span 12;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

}

@media (min-width: 768px) {
  .file__legend {
    grid-column: 1 / span 3;
  }
  .file__content {
    grid-column: 4 / span 10;
  }
}
@media (min-width: 1200px) {
  .file__legend {
    grid-column: 1 / span 2;
  }
  .file__content {
    grid-column: 3 / span 10;
  }
}
.file__bottom-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-top: var(--spacer-4);
  gap: var(--spacer-4);
}
.file__bottom-container__button-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}



</style>