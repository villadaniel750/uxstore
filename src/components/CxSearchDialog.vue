<template>
<v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-top-transition">
        <template v-slot:activator="{ props }">

            <v-btn v-bind="props" class="my-1" icon="mdi-magnify"  type="submit" 
        color="grey"
                 >
            </v-btn>

            
        </template>
        <v-card>
            <v-toolbar dark color="transparent">
                <v-toolbar-title>
                    <v-text-field
                      v-model="search"
                      clearable
                      hide-details
                      :label="$t('Common.search')" 
                      prepend-inner-icon="mdi-magnify"
                      single-line>
                    </v-text-field>
                </v-toolbar-title>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <div color="black">
              <v-list lines="two" subheader color="black">
              </v-list>
            </div>
            
        </v-card>
    </v-dialog>

</template>
  
  <script>
    export default {
      data() {
        return {
          dialog: false,
          search: '',
        }
      },
    }
  </script>