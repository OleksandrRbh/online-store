import CardsList from "./components/cards-list/02-js-task/index.js";
import Pagination from './components/pagination/02-js-task/index.js'

export default class OnlineStorePage {
  constructor (products = []) {
    this.pageSize = 4
    this.products = products
    this.components = {}

    this.initComponents()
    this.render()
    this.renderComponents()
    console.log('this', this)
  }

  getTemplate () {
    return `
      <div>
        <div data-element="cardsList">
          <!-- Card component -->
        </div>
        <div data-element="pagination">
          <!-- Pagination component -->
        </div>
      </div>
    `
  }

  initComponents () {
    const totalPages = Math.ceil(this.products.length / this.pageSize)

    const cardsList = new CardsList(this.products)
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    })

    this.components.cardsList = cardsList
    this.components.pagination = pagination
  }

  render () {
    const wrapper = document.createElement('div')

    wrapper.innerHTML = this.getTemplate()

    this.element = wrapper.firstElementChild
  }

  renderComponents () {
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]')
    const paginationContainer = this.element.querySelector('[data-element="pagination"]')

    cardsContainer.append(this.components.cardsList.element)
    paginationContainer.append(this.components.pagination.element)
  }
}















