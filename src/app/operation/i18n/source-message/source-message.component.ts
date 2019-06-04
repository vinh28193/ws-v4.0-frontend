import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {I18nService} from '../i18n.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {OperationDataComponent} from '../../operation-data.component';

declare var $: any;

@Component({
    selector: 'app-source-message',
    templateUrl: './source-message.component.html',
    styleUrls: ['./source-message.component.css']
})
export class SourceMessageComponent extends OperationDataComponent implements OnInit {

    @ViewChild(ModalDirective) updateMessageModal: ModalDirective;
    // filter
    category: any = '';
    language: any = '';
    translation: any = '';
    // data
    languages: any = {};
    sourcesMessage: any = [];
    // for update
    haveReplacementParts: any;
    activeSourceMessage: any;
    activeMessages: any;
    // form Group
    filterForm: FormGroup;
    messagesForm: FormGroup;

    constructor(private fb: FormBuilder, public i18nService: I18nService) {
        super(i18nService);
    }

    ngOnInit() {
        this.messagesForm = this.fb.group({
            id: '',
            messages: this.fb.array([]),
        });
        this.filterForm = this.fb.group({
            category: '',
            language: '',
            translation: ''
        });
        this.getSourcesMessage();
        const languageTemp = [];
        $.each(this.i18nService.getLanguages(), function (index, item) {
            languageTemp.push(item);
        });
        this.languages = languageTemp;
    }

    getSourcesMessage() {
        let fd: FormData;
        fd = new FormData();
        fd.append('filterForm', JSON.stringify(this.filterForm.value));
        fd.append('limit', this.perPage.toString());
        fd.append('page', this.currentPage.toString());
        this.i18nService.get('i18n/source-message', fd).subscribe(res => {
            this.totalCount = res.total;
            this.sourcesMessage = res.data;
        });
    }

    getlanguageCodeLabels(code) {
        let label = 'undefined';
        for (let i = 0; i < this.languages.length; i++) {
            if (this.languages[i].language === code) {
                if (code === 'en') {
                    label = this.languages[i].name_ascii;
                } else {
                    label = this.languages[i].name + ' (' + this.languages[i].name_ascii + ')';
                }

                break;
            }
        }
        return label;
    }

    get messages(): FormArray {
        return this.messagesForm.get('messages') as FormArray;
    }

    rebuildFilter(category = '', language = '', translation = '') {
        this.filterForm.reset({
            category: category,
            language: language,
            translation: translation
        });
    }

    rebuildForm() {
        this.messagesForm.reset({
            id: this.activeSourceMessage.id
        });
        this.setMessages(this.activeMessages);
    }

    setMessages(messages) {
        const messageFGs = messages.map(message => this.fb.group(message));
        const messageFormArray = this.fb.array(messageFGs);
        this.messagesForm.setControl('messages', messageFormArray);
    }

    prepareTranslation() {
        const formValue = this.messagesForm.value;
        const messagesDeepCopy = formValue.messages.map(
            message => Object.assign({}, message)
        );
        const saved = {
            id: formValue.id,
            messages: messagesDeepCopy
        };
        return saved;
    }

    revert() {
        this.rebuildForm();
    }

    onSubmit() {
        const translation = this.prepareTranslation();
        const fd = new FormData();
        fd.append('translation', JSON.stringify(translation));
        this.i18nService.put('i18n/update-message', fd).subscribe(res => {
            if (res.success) {
                this.getSourcesMessage();
                this.rebuildForm();
            } else {
                this.i18nService.popup.error(res.message, 'Error');
            }
            this.updateMessageModal.hide();
        });
    }

    onFilter() {

    }

    getRibbonCssClass(language?: any) {
        if (typeof language === 'undefined') {
            return 'ribbon ribbon-default';
        }
        language = String(language);
        if (language === 'vi') {
            return 'ribbon ribbon-info';
        } else if (language === 'en') {
            return 'ribbon ribbon-success';
        } else if (language === 'id') {
            return 'ribbon ribbon-primary';
        } else {
            return 'ribbon ribbon-warning';
        }
    }

    updateSourcesMessage(source) {
        this.activeSourceMessage = source;
        this.activeMessages = source.messages;
        this.rebuildForm();
        this.updateMessageModal.show();
    }
}
