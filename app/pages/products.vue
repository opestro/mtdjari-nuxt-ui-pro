<script setup >

const { findOne } = useStrapi()
const mediaUrl = useStrapiMedia()

console.log(mediaUrl)

const defaultColumns = [{
  key: 'images',
  label: 'Image'
}, {
  key: 'title',
  label: 'Name',
  sortable: true
}, {
  key: 'price',
  label: 'Price/Quantity'
}, {
  key: 'sales',
  label: 'Sales',
  sortable: true
}, {
  key: 'action',
  label: 'Action'
}]

const q = ref('')
const selected = ref([])
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const selectedLocations = ref([])
const sort = ref({ column: 'id', direction: 'asc'  })
const input = ref()
const isNewProductModalOpen = ref(false)

const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

// const query = computed(() => ({ q: q.value, statuses: selectedStatuses.value, locations: selectedLocations.value, sort: sort.value.column, order: sort.value.direction }))


const products = await findOne('products',{
    populate: {
        images: true,
    }
})
console.log(products)
// console.log(response)
// const defaultLocations = users.value.reduce((acc, user) => {
//   if (!acc.includes(user.location)) {
//     acc.push(user.location)
//   }
//   return acc
// }, [] as string[])

// const defaultStatuses = users.value.reduce((acc, user) => {
//   if (!acc.includes(user.status)) {
//     acc.push(user.status)
//   }
//   return acc
// }, [] as string[])

// function onSelect(row: User) {
//   const index = selected.value.findIndex(item => item.id === row.id)
//   if (index === -1) {
//     selected.value.push(row)
//   } else {
//     selected.value.splice(index, 1)
//   }
// }

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Products"
        :badge="products.data.length"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter users..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="New product"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewProductModalOpen = true"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="Status"
            multiple
            :options="defaultStatuses"
            :ui-menu="{ option: { base: 'capitalize' } }"
          />
          <USelectMenu
            v-model="selectedLocations"
            icon="i-heroicons-map-pin"
            placeholder="Location"
            :options="defaultLocations"
            multiple
          />
        </template>

        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
            class="hidden lg:block"
          >
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardModal
        v-model="isNewProductModalOpen"
        title="New product"
        description="Add a new product to your store"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <!-- ~/components/products/ProductsForm.vue -->
        <ProductsProductForm @close="isNewProductModalOpen = false" ></ProductsProductForm>
      </UDashboardModal>

      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="products.data"
        :columns="columns"
        :loading="pending"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @select="onSelect"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              v-bind="row.images[0]"
              :alt="row.name"
              size="xs"
            />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.title }}</span>
          </div>
        </template>
        <template #images-data="{ row }">
          <div class="flex items-center gap-3">
            <NuxtImg :src="mediaUrl+row.images[0].url" class="w-10"></NuxtImg>
          </div>
        </template>
        <template #price-data="{ row }">
          <div class="grid  items-center gap-3">
            <span class="text-gray-900 dark:text-white font-medium">{{ row.price + ' DA'}}</span>
            <span v-if="row.stock > 10 " class="bg-green-500 w-fit px-1 text-white rounded-lg    font-medium">{{   row.stock + ' pcs in stock' }}</span>
            <span v-if="row.stock <= 10  && row.stock != 0" class="bg-yellow-500 w-fit px-1 text-white rounded-lg    font-medium">{{   row.stock + ' pcs in stock' }}</span>
            <span v-if="row.stock == 0" class="bg-red-500 w-fit px-1 text-white rounded-lg    font-medium">{{   row.stock +'pcs out of stock' }}</span>
          </div>
        </template>
        <template #action-data="{row}">
          <div class="flex  items-center gap-3">
          <button> <Icon name="solar:pen-new-round-linear" class=" w-8 h-8"></Icon> </button>
          <button> <Icon name="solar:trash-bin-trash-bold" class=" w-8 h-8"></Icon> </button>
          </div>
        </template>

        <!-- <template #status-data="{ row }">
          <UBadge
            :label="row.action"
            variant="subtle"
            class="capitalize"
          />
        </template> -->
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
