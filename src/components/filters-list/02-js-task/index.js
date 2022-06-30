export default class FiltersList {
  constructor ({ name = 'Filter name', data = [] }) {
    this.filterName = name
    this.filterData = data

    this.render()
  }

  getTemplate () {
    return `
      <div class="os-filter">
        <h3 class="os-filter__title">${this.filterName}</h3>
        <ul class="os-filter__list">
          <li class="os-filter__item">
            <input
              class="os-filter__input"
              id="filter-category-0"
              type="checkbox"
              name="filter"
              value="category=cellphones"
            >
            <label class="os-filter__label" for="filter-category-0">Cell phones</label>
          </li>
          <li class="os-filter__item">
            <input
              class="os-filter__input"
              id="filter-category-1"
              type="checkbox"
              name="filter"
              value="category=monitors"
            >
            <label class="os-filter__label" for="filter-category-1">Monitors</label>
          </li>
        </ul>
      </div>
    `
  }

  render () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.getTemplate()
    this.element = wrapper.firstElementChild
  }
}
