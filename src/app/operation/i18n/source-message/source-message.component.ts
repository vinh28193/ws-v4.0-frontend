import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {I18nService} from '../i18n.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OperationDataComponent} from '../../operation-data.component';

declare var $: any;

@Component({
    selector: 'app-source-message',
    templateUrl: './source-message.component.html',
    styleUrls: ['./source-message.component.css']
})
export class SourceMessageComponent extends OperationDataComponent implements OnInit {

    @ViewChild('updateMessageModal') updateMessageModal: ModalDirective;
    @ViewChild('addkey') addkey: ModalDirective;
    category: any = '';
    language: any = '';
    languages: any = {};
    sourcesMessage: any = [];
    activeSourceMessage: any;
    filterForm: FormGroup;
    messagesForm: any = {
        id: 0,
        messages: []
    };
    sourceAdd = '';
    formaddkey: any = {
        category: '',
        key: '',
    };

    constructor(private fb: FormBuilder, public i18nService: I18nService) {
        super(i18nService);
    }

    ngOnInit() {
        this.filterForm = this.fb.group({
            category: '',
            language: '',
            translation: ''
        });
        this.getSourcesMessage();
        const languageTemp = [];
        $.each(this.getLanguages(), function (index, item) {
            languageTemp.push(item);
        });
        this.languages = languageTemp;
    }
    getSourcesMessage() {
        this.i18nService.get('i18n', this.filterForm.value).subscribe(res => {
            this.totalCount = res.total;
            this.sourcesMessage = res.data;
        });
    }

    showAddKey() {
        this.formaddkey.category = '';
        this.formaddkey.key = '';
        this.addkey.show();
    }

    getLanguages() {
        let languages = JSON.parse(localStorage.getItem('languages'));
        if (!languages) {
            this.i18nService.get('i18n/get-lang').subscribe(res => {
                const result: any = res;
                if (result.success) {
                    languages = result.data;
                } else {
                    this.i18nService.popup.error('Can not connect to server', 'Erorr');
                }
                localStorage.setItem('languages', JSON.stringify(languages));
            });
        }
        return languages;
    }
    getlanguageCodeLabels(code) {
        let label = code;
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

    rebuildForm() {
        this.messagesForm.id = this.activeSourceMessage.id;
        this.messagesForm.messages = this.activeSourceMessage.messages;
    }

    revert() {
        this.rebuildForm();
    }

    onSubmit() {
        this.i18nService.put('i18n/' + this.messagesForm.id, {message: this.messagesForm.messages}).subscribe(res => {
            if (res.success) {
                this.getSourcesMessage();
                this.rebuildForm();
            } else {
                this.i18nService.popup.error(res.message, 'Error');
            }
            this.updateMessageModal.hide();
        });
    }

    getRibbonCssClass(language?: any) {
        if (typeof language === 'undefined') {
            return 'ribbon ribbon-default';
        }
        language = String(language);
        if (language === 'vi' || language === 'vi-VN') {
            return 'ribbon ribbon-info';
        } else if (language === 'en' || language === 'en-US') {
            return 'ribbon ribbon-success';
        } else if (language === 'id' || language === 'id-ID') {
            return 'ribbon ribbon-primary';
        } else {
            return 'ribbon ribbon-warning';
        }
    }

    updateSourcesMessage(source) {
        this.activeSourceMessage = source;
        this.rebuildForm();
        this.updateMessageModal.show();
    }

    checkAddSource() {
        const arrayLang = [];
        const messagesCurrent = this.messagesForm.messages;
        $.each(this.languages, function (k, v) {
            const rs = messagesCurrent.filter(c => c.language === v.language);
            if (!rs || rs.length === 0) {
                arrayLang.push(v);
            }
        });
        return arrayLang;
    }

    addSource() {
        if (!this.sourceAdd) {
            this.i18nService.popup.error('Select source!');
        } else {
            console.log(this.activeSourceMessage);
            this.messagesForm.messages.push({
                id: this.activeSourceMessage.id,
                language: this.sourceAdd,
                translation: this.activeSourceMessage.message,
            });
            this.sourceAdd = '';
        }
    }

    saveKey() {
        if (!this.formaddkey.category || !this.formaddkey.key) {
            return this.i18nService.popup.error('Enter all field');
        }
        this.i18nService.post('i18n', this.formaddkey).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.i18nService.popup.success(rs.message);
                this.addkey.hide();
            } else {
                this.i18nService.popup.error(rs.message);
            }
        });
    }
}
