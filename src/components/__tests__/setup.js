import { config } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faTrashCan, faSquareCheck } from '@fortawesome/free-regular-svg-icons'

library.add(faPlus, faSquare, faTrashCan, faSquareCheck, faPencil)

config.global.components = {
  'font-awesome-icon': FontAwesomeIcon
}
