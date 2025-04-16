import { Modal } from './abstracts/Modal';
import { IView } from './abstracts/View';

export class SuccessModalView extends Modal {
    private total: number;

    constructor(total: number) {
        super();
        this.total = total;
    }

    init(): void {
        const template = document.getElementById('success') as HTMLTemplateElement;
        const content = template.content.cloneNode(true) as HTMLElement & IView;
        
        const descriptionEl = content.querySelector('.order-success__description') as HTMLElement;
        const closeBtn = content.querySelector('.order-success__close') as HTMLElement;

        descriptionEl.textContent = `Списано ${this.total} синапсов`;

        closeBtn.addEventListener('click', () => this.close());

        this.setContent(content as HTMLElement & IView);
    }
}