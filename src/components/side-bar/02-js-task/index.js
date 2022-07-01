import FiltersList from "../../filters-list/02-js-task/index.js";

const BACKEND_URL = 'https://online-store.bootcamp.place/api/'

export default class SideBar {
  constructor () {
    this.components = {}
    this.categoriesFilterData = []
    this.brandsFilterData = []

    this.categoriesUrl = new URL('categories', BACKEND_URL)
    this.brandsUrl = new URL('brands', BACKEND_URL)

    this.render()
    this.initFilters()
  }

  async initFilters () {
    await Promise.all([
      this.fetchCategoriesData(),
      this.fetchBrandsData()
    ])
    this.renderCategoriesFilter()
    this.renderBrandsFilter()
    this.initEventListeners()
  }

  initEventListeners () {
    this.components.brandsFilter.element.addEventListener('filter-changed', event => {
      console.log('event.detail', event.detail)
    })

    this.components.categoryFilter.element.addEventListener('filter-changed', event => {
      console.log('event.detail', event.detail)
    })
  }

  async fetchCategoriesData () {
    const response = await fetch(this.categoriesUrl);
    this.categoriesFilterData = await response.json();
  }

  async fetchBrandsData () {
    const response = await fetch(this.brandsUrl);
    this.brandsFilterData = await response.json();
  }

  async renderCategoriesFilter () {
    console.log('this.categoriesFilterData', this.categoriesFilterData)
    if (this.categoriesFilterData && this.categoriesFilterData.length) {
      this.components.categoryFilter = new FiltersList({ name: 'category', data: this.categoriesFilterData })
      const container = this.element.querySelector('[data-element="filters"]')
      container.appendChild(this.components.categoryFilter.element)
    }
  }

  async renderBrandsFilter () {
    console.log('this.brandsFilterData', this.brandsFilterData)
    if (this.brandsFilterData && this.brandsFilterData.length) {
      this.components.brandsFilter = new FiltersList({ name: 'brand', data: this.brandsFilterData })
      const container = this.element.querySelector('[data-element="filters"]')
      container.appendChild(this.components.brandsFilter.element)
    }
  }

  getTemplate () {
    return `
      <div class="os-sidebar">
        <div class="os-sidebar__filters" data-element="filters">
          <!-- filters -->
        </div>

        <!-- reset button -->
      </div>
    `
  }

  render () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.getTemplate()
    this.element = wrapper.firstElementChild
  }
}
