import CardsList from "./components/cards-list/02-js-task/index.js";
import Pagination from './components/pagination/02-js-task/index.js';
import SearchBox from './components/search-box/02-js-task/index.js';
import SideBar from './components/side-bar/02-js-task/index.js';

const BACKEND_URL = 'https://online-store.bootcamp.place/api/'

export default class OnlineStorePage {
  constructor () {
    this.components = {}
    this.products = []
    this.totalElements = 100
    this.filters = {
      _page: 1,
      _limit: 9,
      q: ''
    }

    this.url = new URL('products', BACKEND_URL)

    this.initComponents()
    this.render()
    this.renderComponents()
    this.initEventListeners()

    this.update('_page', 1)
    console.log('this', this)
  }

  async loadData () {
    for (const key in this.filters) {
      if (this.filters[key]) {
        this.url.searchParams.set(key, this.filters[key])
      } else {
        this.url.searchParams.delete(key, this.filters[key])
      }
    }

    const response = await fetch(this.url);

    this.totalElements = Number(response.headers.get('X-Total-Count'))
    const totalPages = Math.ceil(this.totalElements / this.filters._limit)

    const products = await response.json();
    return { products, totalPages };
  }

  getTemplate () {
    return `
      <div class="page">
        <header>

        </header>
        <main class="main-container">
          <aside class="os-sidebar-container" data-element="sideBar">
            <!-- Side Bar component -->
          </aside>
          <section>
            <div data-element="searchBox">
              <!-- Search Box component -->
            </div>
            <div data-element="cardsList">
              <!-- Cards List component -->
            </div>
            <div class="os-pagination-container" data-element="pagination">
              <!-- Pagination component -->
            </div>
          </section>
        </main>
      </div>
    `
  }

  initComponents () {
    const totalPages = Math.ceil(this.totalElements / this.filters._limit)

    const cardsList = new CardsList(this.products)
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    })
    const searchBox = new SearchBox()
    const sideBar = new SideBar()

    this.components.cardsList = cardsList
    this.components.pagination = pagination
    this.components.searchBox = searchBox
    this.components.sideBar = sideBar
  }

  render () {
    const wrapper = document.createElement('div')

    wrapper.innerHTML = this.getTemplate()

    this.element = wrapper.firstElementChild
  }

  renderComponents () {
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]')
    const paginationContainer = this.element.querySelector('[data-element="pagination"]')
    const searchBoxContainer = this.element.querySelector('[data-element="searchBox"]')
    const sideBarContainer = this.element.querySelector('[data-element="sideBar"]')

    cardsContainer.append(this.components.cardsList.element)
    paginationContainer.append(this.components.pagination.element)
    searchBoxContainer.append(this.components.searchBox.element)
    sideBarContainer.append(this.components.sideBar.element)
  }

  initEventListeners () {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = Number(event.detail)

      this.update('_page', pageIndex + 1)
    })

    this.components.searchBox.element.addEventListener('search-changed', event => {
      const searchQuery = event.detail

      this.update('q', searchQuery)
    })
  }

  async update (filterName, filtervalue) {
    this.filters[filterName] = filtervalue
    if (filterName === 'q') this.filters._page = 1

    const { products, totalPages } = await this.loadData()

    if (filterName === '_page') {
      this.components.cardsList.update(products)
    }
    if (filterName === 'q') {
      this.components.pagination.update(totalPages)
      this.components.cardsList.update(products)
    }

    console.log(this.filters);
  }
}















