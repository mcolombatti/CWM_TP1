
/**
 * Parsea el string a un elemento de HTML de DOM.
 *
 * @param {string} template
 * @return HTMLElement
 */
function stringToDOM(template) { 
    const div = document.createElement('div');
    div.innerHTML = template;
    return div.firstChild;
}
/**
 * Genera el elemento de DOM en base a las opciones provistas.
 *
 * @param {string} template
 * @param {{}} options
 * @return HTMLElement
 */
 function componentCreation(template) {
    const DOMNode = stringToDOM(template); 
    return DOMNode;
}

export {
    componentCreation
}
