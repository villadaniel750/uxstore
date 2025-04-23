<template>
  <v-container fluid>
    <v-list-item
      :active="activeItem === 'videoUpload'"
      v-slot:prepend=""
      class="my-4"
    >
      <v-icon color="primary" size="24">mdi-cloud-upload-outline</v-icon>
      <v-list-item-title class="ml-3 text-h6">
        {{ $t("Common.upload") }}
      </v-list-item-title>
    </v-list-item>
    <v-row justify="center">
      <v-col key="0" cols="12" sm="12" md="12" lg="5" xl="5">
        <label
          for="images1"
          class="drop-container d-flex flex-column align-center justify-center cursor-pointer darken-1 rounded-10 pa-4 rounded-lg"
          id="dropcontainer"
          style="height: 280px"
        >
          <img
            src="/src/assets/file-upload.svg"
            alt="Twitter"
            class="mt-3 white-icon"
            style="height: 70px; width: 70px"
          />
          <span class="text-h6 drop-title mb-6">Drag and drop files here</span>
          <input
            type="file"
            class="d-none"
            id="images1"
            accept="image/*"
            required
          />
        </label>
        <v-btn class="mt-3 w-100"> Upload </v-btn>
      </v-col>
      <v-col key="1" cols="12" sm="12" md="12" lg="5" xl="5">
        <v-text-field
          label="Title"
          v-model="videoTitle"
          outlined
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="categoryTags"
          outlined
          :maxlength="600"
          :counter="600"
        ></v-textarea>
        <div class="d-flex ga-4 align-center">
          <label
            for="images2"
            class="drop-container d-flex flex-column align-center justify-center cursor-pointer darken-1 rounded-10 pa-2 rounded-lg"
            id="dropcontainer"
          >
            <span class="text-subtitle-1 drop-title">Thumbnail</span>
            <input
              type="file"
              class="d-none"
              id="images2"
              accept="image/*"
              required
            />
          </label>
          <v-btn class=""> Upload </v-btn>
        </div>
        <v-radio-group class="mt-1" v-model="videoType">
          <v-radio label="Free Video" value="free"></v-radio>
          <v-radio
            label="Paid Video"
            value="paid"
            @click="showPaidVideoDialog = true"
          ></v-radio>
        </v-radio-group>
        <v-text-field
          label="Price"
          v-if="videoType === 'paid'"
          v-model="price"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col key="0" cols="12" sm="12" md="12" lg="4" xl="4">
        <v-checkbox
          v-model="agreeTerms"
          label="I agree to the terms and conditions"
        ></v-checkbox>
        <div class="d-flex flex-wrap">
          <v-btn class="me-4 my-2" @click="preview">Preview</v-btn>
          <v-btn class="me-4 my-2" @click="saveAsDraft">Save as Draft</v-btn>
          <v-btn class="my-2" @click="publish">Publish</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showPaidVideoDialog"
      max-width="600"
      @update:model-value="onDialogClose"
      class="pa-2"
    >
      <v-card class="pa-2 pa-sm-4">
        <v-card-title class="text-h5 text-sm-h4 pa-2 pa-sm-4">
          Transaction Details
        </v-card-title>

        <v-card-text>
          <v-container class="pa-0">
            <div class="mb-4">
              <h2 class="text-subtitle-1 text-sm-h6 font-weight-bold mb-2">
                Video Information
              </h2>
              <v-divider class="mb-3"></v-divider>
              <h3 class="text-body-1 text-sm-subtitle-1">
                Title: {{ videoTitle || "Untitled Video" }}
              </h3>
              <h4
                class="text-body-2 text-sm-subtitle-2 text-medium-emphasis mb-2"
              >
                Description: {{ categoryTags || "No description provided" }}
              </h4>
            </div>

            <div class="d-flex justify-space-between align-center mb-4">
              <div class="text-subtitle-1 text-sm-h6 font-weight-bold">
                Total Amount
              </div>
              <div class="text-h6 text-sm-h5 font-weight-bold primary--text">
                {{ calculateTotal }} XLM
              </div>
            </div>

            <div class="mb-4">
              <h2 class="text-subtitle-1 text-sm-h6 font-weight-bold mb-2">
                Transaction Breakdown
              </h2>
              <v-divider class="mb-3"></v-divider>

              <v-list class="pa-0">
                <v-list-item
                  v-for="(operation, index) in transactionBreakdown"
                  :key="index"
                  class="px-0"
                >
                  <template v-slot:prepend>
                    <v-chip
                      size="small"
                      :color="operation.color"
                      class="font-weight-bold mr-2"
                    >
                      {{ operation.percentage }}%
                    </v-chip>
                  </template>

                  <v-list-item-title class="text-body-2 text-sm-subtitle-2">{{
                    operation.name
                  }}</v-list-item-title>

                  <template v-slot:append>
                    <div
                      class="text-body-2 text-sm-subtitle-2 font-weight-medium"
                    >
                      {{ operation.amount }} XLM
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </div>

            <v-alert
              type="info"
              variant="tonal"
              density="comfortable"
              class="mb-0"
            >
              Network fees may apply to this transaction
            </v-alert>
          </v-container>
        </v-card-text>

        <v-card-actions class="pa-2 pa-sm-4">
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="cancelPaidVideo"
            class="me-2"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            :loading="isProcessing"
            @click="processPayment"
          >
            Pay {{ calculateTotal }} XLM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.drop-container {
  transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
  border: 1px dashed #555;
}

.white-icon {
  filter: none;
}

.v-theme--dark .white-icon {
  filter: brightness(0) invert(1);
}

.drop-container:hover {
  background: #eee;
  border-color: #111;
}

.drop-container:hover .drop-title {
  color: #222;
}

.v-list-item {
  min-height: 44px;
}
</style>

<script>
export default {
  data() {
    return {
      videoTitle: "",
      categoryTags: "",
      videoType: "free", // default to free
      price: "",
      agreeTerms: false,
      showPaidVideoDialog: false,
      priceAmount: 0,
      isProcessing: false,
      transactionBreakdown: [
        {
          name: "Content Creator Share",
          percentage: 85,
          amount: 0,
          color: "primary",
        },
        {
          name: "Platform Fee",
          percentage: 10,
          amount: 0,
          color: "secondary",
        },
        {
          name: "Network Fee",
          percentage: 5,
          amount: 0,
          color: "grey",
        },
      ],
    };
  },
  computed: {
    calculateTotal() {
      return this.priceAmount || 0;
    },
  },
  watch: {
    priceAmount: {
      handler(newValue) {
        // Update breakdown amounts when price changes
        this.updateBreakdownAmounts(newValue);
      },
      immediate: true,
    },
  },
  methods: {
    updateBreakdownAmounts(total) {
      this.transactionBreakdown = this.transactionBreakdown.map((item) => ({
        ...item,
        amount: ((total * item.percentage) / 100).toFixed(2),
      }));
    },
    cancelPaidVideo() {
      this.showPaidVideoDialog = false;
      this.videoType = "free";
      this.priceAmount = 0;
    },
    async processPayment() {
      this.isProcessing = true;
      try {
        // Payment processing logic will go here
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
        this.showPaidVideoDialog = false;
        this.videoType = "paid";
      } catch (error) {
        console.error("Payment failed:", error);
      } finally {
        this.isProcessing = false;
      }
    },
    onDialogClose(value) {
      if (!value) {
        this.videoType = "free";
        this.priceAmount = 0;
      }
    },
  },
};
</script>
