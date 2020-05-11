/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var _1CHighlightRules = function() {

        var keywords = (
            "Процедура|Функция|КонецПроцедуры|КонецФункции|Для|Пока|По|Цикл|КонецЦикла|Если|Тогда|Иначе|ИначеЕсли|КонецЕсли|Попытка|Исключение|КонецПопытки|Каждого|" +
            "Перем|Знач|И|Или|Не|Новый|Прервать|Продолжить|Возврат|Экспорт|Перейти|ВызватьИсключение" +
            "procedure|function|endprocedure|endfunction|for|while|to|do|enddo|if|then|else|elseif|endif|try|catch|endtry|each|" +
            "var|val|and|or|not|new|break|continue|return|export|array|structure|map|rise"
        );
        var builtinConstants = (
            "Неопределено|Undefined|Истина|True|Ложь|False|NULL"
        );
        var builtinFunctions = (
            "СтрДлина|StrLen|СокрЛ|TrimL|СокрП|TrimR|СокрЛП|TrimAll|Лев|Left|Прав|" +
            "Right|Сред|Mid|СтрНайти|StrFind|ВРег|Upper|НРег|Lower|" +
            "ТРег|Title|Символ|Char|КодСимвола|CharCode|ПустаяСтрока|" +
            "IsBlankString|СтрЗаменить|StrReplace|СтрЧислоСтрок|StrLineCount|" +
            "СтрПолучитьСтроку|StrGetLine|СтрЧислоВхождений|StrOccurrenceCount|" +
            "СтрСравнить|StrCompare|СтрНачинаетсяС|StrStartWith|СтрЗаканчиваетсяНа|" +
            "StrEndsWith|СтрРазделить|StrSplit|СтрСоединить|StrConcat|" +
            "ПоказатьВопрос|ShowQueryBox|Вопрос|DoQueryBox|ПоказатьПредупреждение|ShowMessageBox|Предупреждение|DoMessageBox|Сообщить|Message|ОчиститьСообщения|ClearMessages|ОповеститьОбИзменении|NotifyChanged|Состояние|Status|Сигнал|Beep|ПоказатьЗначение|ShowValue|ОткрытьЗначение|OpenValue|Оповестить|Notify|ОбработкаПрерыванияПользователя|UserInterruptProcessing|ОткрытьСодержаниеСправки|OpenHelpContent|ОткрытьИндексСправки|OpenHelpIndex|ОткрытьСправку|OpenHelp|ПоказатьИнформациюОбОшибке|ShowErrorInfo|КраткоеПредставлениеОшибки|BriefErrorDescription|ПодробноеПредставлениеОшибки|DetailErrorDescription|ПолучитьФорму|GetForm|ЗакрытьСправку|CloseHelp|ПоказатьОповещениеПользователя|ShowUserNotification|ОткрытьФорму|OpenForm|ОткрытьФормуМодально|OpenFormModal|АктивноеОкно|ActiveWindow|ВыполнитьОбработкуОповещения|ExecuteNotifyProcessing|" +
            "Новый|New|" +
            "Цел|Int|Окр|Round|ACos|ACos|ASin|ASin|ATan|ATan|Cos|Cos|Exp|Exp|Log|Log|Log10|Log10|Pow|Pow|Sin|Sin|Sqrt|Sqrt|Tan|Tan|" +
            "Год|Year|Месяц|Month|День|Day|Час|Hour|Минута|Minute|Секунда|Second|НачалоГода|BegOfYear|НачалоДня|BegOfDay|НачалоКвартала|BegOfQuarter|НачалоМесяца|BegOfMonth|НачалоМинуты|BegOfMinute|НачалоНедели|BegOfWeek|НачалоЧаса|BegOfHour|КонецГода|EndOfYear|КонецДня|EndOfDay|КонецКвартала|" + "EndOfQuarter|КонецМесяца|EndOfMonth|КонецМинуты|EndOfMinute|КонецНедели|EndOfWeek|КонецЧаса|EndOfHour|НеделяГода|WeekOfYear|ДеньГода|DayOfYear|ДеньНедели|WeekDay|ТекущаяДата|CurrentDate|ДобавитьМесяц|AddMonth|" +
            "ПолучитьЗаголовокСистемы|GetCaption|ПолучитьСкоростьКлиентскогоСоединения|GetClientConnectionSpeed|ПодключитьОбработчикОжидания|AttachIdleHandler|УстановитьЗаголовокСистемы|SetCaption|ОтключитьОбработчикОжидания|DetachIdleHandler|ИмяКомпьютера|ComputerName|ЗавершитьРаботуСистемы|Exit|ИмяПользователя|UserName|ПрекратитьРаботуСистемы|Terminate|ПолноеИмяПользователя|UserFullName|ЗаблокироватьРаботуПользователя|LockApplication|КаталогПрограммы|BinDir|КаталогВременныхФайлов|TempFilesDir|ПравоДоступа|AccessRight|РольДоступна|IsInRole|ТекущийЯзык|CurrentLanguage|ТекущийКодЛокализации|CurrentLocaleCode|СтрокаСоединенияИнформационнойБазы|InfoBaseConnectionString|ПодключитьОбработчикОповещения|AttachNotificationHandler|ОтключитьОбработчикОповещения|DetachNotificationHandler|ПолучитьСообщенияПользователю|GetUserMessages|ПараметрыДоступа|AccessParameters|ПредставлениеПриложения|ApplicationPresentation|ТекущийЯзыкСистемы|CurrentSystemLanguage|ЗапуститьСистему|RunSystem|ТекущийРежимЗапуска|CurrentRunMode|УстановитьЧасовойПоясСеанса|SetSessionTimeZone|ЧасовойПоясСеанса|SessionTimeZone|ТекущаяДатаСеанса|CurrentSessionDate|УстановитьКраткийЗаголовокПриложения|SetShortApplicationCaption|ПолучитьКраткийЗаголовокПриложения|GetShortApplicationCaption|ПредставлениеПрава|RightPresentation|ВыполнитьПроверкуПравДоступа|VerifyAccessRights|РабочийКаталогДанныхПользователя|UserDataWorkDir|КаталогДокументов|DocumentsDir|ПолучитьИнформациюЭкрановКлиента|GetClientDisplaysInformation|ТекущийВариантОсновногоШрифтаКлиентскогоПриложения|ClientApplicationBaseFontCurrentVariant|ТекущийВариантИнтерфейсаКлиентскогоПриложения|ClientApplicationInterfaceCurrentVariant|УстановитьЗаголовокКлиентскогоПриложения|SetClientApplicationCaption|ПолучитьЗаголовокКлиентскогоПриложения|GetClientApplicationCaption|НачатьПолучениеКаталогаВременныхФайлов|BeginGettingTempFilesDir|НачатьПолучениеКаталогаДокументов|BeginGettingDocumentsDir|" + "НачатьПолучениеРабочегоКаталогаДанныхПользователя|BeginGettingUserDataWorkDir|ПодключитьОбработчикЗапросаНастроекКлиентаЛицензирования|AttachLicensingClientParametersRequestHandler|ОтключитьОбработчикЗапросаНастроекКлиентаЛицензирования|DetachLicensingClientParametersRequestHandler|" +
            "Тип|Type|ТипЗнч|TypeOf|" +
            "Булево|Boolean|Число|Number|Строка|String|Дата|Date|" +
            "ПоказатьВводЗначения|ShowInputValue|ВвестиЗначение|InputValue|ПоказатьВводЧисла|ShowInputNumber|ВвестиЧисло|InputNumber|ПоказатьВводСтроки|ShowInputString|ВвестиСтроку|InputString|ПоказатьВводДаты|ShowInputDate|ВвестиДату|InputDate|" +
            "Формат|Format|ЧислоПрописью|NumberInWords|НСтр|NStr|ПредставлениеПериода|PeriodPresentation|СтрШаблон|StrTemplate|" +
            "ПолучитьОбщийМакет|GetCommonTemplate|ПолучитьОбщуюФорму|GetCommonForm|ПредопределенноеЗначение|PredefinedValue|ПолучитьПолноеИмяПредопределенногоЗначения|GetPredefinedValueFullName|" +
            "ЗначениеВСтрокуВнутр|ValueToStringInternal|ЗначениеИзСтрокиВнутр|ValueFromStringInternal|ЗначениеВФайл|ValueToFile|ЗначениеИзФайла|ValueFromFile|" +
            "КомандаСистемы|System|ЗапуститьПриложение|RunApp|ПолучитьCOMОбъект|GetCOMObject|ПользователиОС|OSUsers|НачатьЗапускПриложения|BeginRunningApplication|" +
            "ПодключитьВнешнююКомпоненту|AttachAddIn|НачатьУстановкуВнешнейКомпоненты|BeginInstallAddIn|УстановитьВнешнююКомпоненту|InstallAddIn|НачатьПодключениеВнешнейКомпоненты|BeginAttachingAddIn|" +
            "КопироватьФайл|FileCopy|ПереместитьФайл|MoveFile|УдалитьФайлы|DeleteFiles|НайтиФайлы|FindFiles|СоздатьКаталог|CreateDirectory|ПолучитьИмяВременногоФайла|GetTempFileName|РазделитьФайл|SplitFile|ОбъединитьФайлы|MergeFiles|ПолучитьФайл|GetFile|НачатьПомещениеФайла|BeginPutFile|ПоместитьФайл|PutFile|ЭтоАдресВременногоХранилища|IsTempStorageURL|УдалитьИзВременногоХранилища|DeleteFromTempStorage|ПолучитьИзВременногоХранилища|GetFromTempStorage|ПоместитьВоВременноеХранилище|PutToTempStorage|ПодключитьРасширениеРаботыСФайлами|AttachFileSystemExtension|НачатьУстановкуРасширенияРаботыСФайлами|BeginInstallFileSystemExtension|УстановитьРасширениеРаботыСФайлами|InstallFileSystemExtension|ПолучитьФайлы|GetFiles|ПоместитьФайлы|PutFiles|ЗапроситьРазрешениеПользователя|RequestUserPermission|ПолучитьМаскуВсеФайлы|GetAllFilesMask|ПолучитьМаскуВсеФайлыКлиента|GetClientAllFilesMask|ПолучитьМаскуВсеФайлыСервера|GetServerAllFilesMask|ПолучитьРазделительПути|GetPathSeparator|ПолучитьРазделительПутиКлиента|GetClientPathSeparator|ПолучитьРазделительПутиСервера|GetServerPathSeparator|НачатьПодключениеРасширенияРаботыСФайлами|BeginAttachingFileSystemExtension|НачатьЗапросРазрешенияПользователя|BeginRequestingUserPermission|НачатьПоискФайлов|BeginFindingFiles|НачатьСозданиеКаталога|BeginCreatingDirectory|НачатьКопированиеФайла|BeginCopyingFile|НачатьПеремещениеФайла|BeginMovingFile|НачатьУдалениеФайлов|BeginDeletingFiles|НачатьПолучениеФайлов|BeginGettingFiles|НачатьПомещениеФайлов|BeginPuttingFiles|" +
            "НачатьТранзакцию|BeginTransaction|ЗафиксироватьТранзакцию|CommitTransaction|ОтменитьТранзакцию|RollbackTransaction|УстановитьМонопольныйРежим|SetExclusiveMode|МонопольныйРежим|ExclusiveMode|ПолучитьОперативнуюОтметкуВремени|GetRealTimeTimestamp|ПолучитьСоединенияИнформационнойБазы|GetInfoBaseConnections|НомерСоединенияИнформационнойБазы|InfoBaseConnectionNumber|КонфигурацияИзменена|ConfigurationChanged|КонфигурацияБазыДанныхИзмененаДинамически|DataBaseConfigurationChangedDynamically|УстановитьВремяОжиданияБлокировкиДанных|SetLockWaitTime|ОбновитьНумерациюОбъектов|RefreshObjectsNumbering|ПолучитьВремяОжиданияБлокировкиДанных|GetLockWaitTime|КодЛокализацииИнформационнойБазы|InfoBaseLocaleCode|УстановитьМинимальнуюДлинуПаролейПользователей|SetUserPasswordMinLength|ПолучитьМинимальнуюДлинуПаролейПользователей|GetUserPasswordMinLength|ИнициализироватьПредопределенныеДанные|InitializePredefinedData|УдалитьДанныеИнформационнойБазы|EraseInfoBaseData|УстановитьПроверкуСложностиПаролейПользователей|SetUserPasswordStrengthCheck|ПолучитьПроверкуСложностиПаролейПользователей|GetUserPasswordStrengthCheck|ПолучитьСтруктуруХраненияБазыДанных|GetDBStorageStructureInfo|УстановитьПривилегированныйРежим|SetPrivilegedMode|ПривилегированныйРежим|PrivilegedMode|ТранзакцияАктивна|TransactionActive|НеобходимостьЗавершенияСоединения|ConnectionStopRequest|НомерСеансаИнформационнойБазы|InfoBaseSessionNumber|ПолучитьСеансыИнформационнойБазы|GetInfoBaseSessions|ЗаблокироватьДанныеДляРедактирования|LockDataForEdit|УстановитьСоединениеСВнешнимИсточникомДанных|ConnectExternalDataSource|РазблокироватьДанныеДляРедактирования|UnlockDataForEdit|РазорватьСоединениеСВнешнимИсточникомДанных|DisconnectExternalDataSource|ПолучитьБлокировкуСеансов|GetSessionsLock|УстановитьБлокировкуСеансов|SetSessionsLock|ОбновитьПовторноИспользуемыеЗначения|RefreshReusableValues|УстановитьБезопасныйРежим|SetSafeMode|БезопасныйРежим|SafeMode|ПолучитьДанныеВыбора|GetChoiceData|УстановитьЧасовойПоясИнформационнойБазы|SetInfoBaseTimeZone|ПолучитьЧасовойПоясИнформационнойБазы|GetInfoBaseTimeZone|ПолучитьОбновлениеКонфигурацииБазыДанных|GetDataBaseConfigurationUpdate|УстановитьБезопасныйРежимРазделенияДанных|SetDataSeparationSafeMode|БезопасныйРежимРазделенияДанных|DataSeparationSafeMode|УстановитьВремяЗасыпанияПассивногоСеанса|SetPassiveSessionHibernateTime|ПолучитьВремяЗасыпанияПассивногоСеанса|GetPassiveSessionHibernateTime|УстановитьВремяЗавершенияСпящегоСеанса|SetHibernateSessionTerminateTime|ПолучитьВремяЗавершенияСпящегоСеанса|GetHibernateSessionTerminateTime|ПолучитьТекущийСеансИнформационнойБазы|GetCurrentInfoBaseSession|ПолучитьИдентификаторКонфигурации|GetConfigurationID|УстановитьНастройкиКлиентаЛицензирования|SetLicensingClientParameters|ПолучитьИмяКлиентаЛицензирования|GetLicensingClientName|ПолучитьДополнительныйПараметрКлиентаЛицензирования|GetLicensingClientAdditionalParameter|" +
            "НайтиПомеченныеНаУдаление|FindMarkedForDeletion|НайтиПоСсылкам|FindByRef|УдалитьОбъекты|DeleteObjects|УстановитьОбновлениеПредопределенныхДанныхИнформационнойБазы|SetInfoBasePredefinedDataUpdate|ПолучитьОбновлениеПредопределенныхДанныхИнформационнойБазы|GetInfoBasePredefinedData|" +
            "XMLСтрока|XMLString|XMLЗначение|XMLValue|XMLТип|XMLType|XMLТипЗнч|XMLTypeOf|ИзXMLТипа|FromXMLType|ВозможностьЧтенияXML|CanReadXML|ПолучитьXMLТип|GetXMLType|ПрочитатьXML|ReadXML|ЗаписатьXML|WriteXML|НайтиНедопустимыеСимволыXML|FindDisallowedXMLCharacters|ИмпортМоделиXDTO|ImportXDTOModel|СоздатьФабрикуXDTO|CreateXDTOFactory|" +
            "ЗаписатьJSON|WriteJSON|ПрочитатьJSON|ReadJSON|ПрочитатьДатуJSON|ReadJSONDate|ЗаписатьДатуJSON|WriteJSONDate|" +
            "ЗаписьЖурналаРегистрации|WriteLogEvent|ПолучитьИспользованиеЖурналаРегистрации|GetEventLogUsing|УстановитьИспользованиеЖурналаРегистрации|SetEventLogUsing|ПредставлениеСобытияЖурналаРегистрации|EventLogEventPresentation|ВыгрузитьЖурналРегистрации|UnloadEventLog|ПолучитьЗначенияОтбораЖурналаРегистрации|GetEventLogFilterValues|УстановитьИспользованиеСобытияЖурналаРегистрации|SetEventLogEventUse|ПолучитьИспользованиеСобытияЖурналаРегистрации|GetEventLogEventUse|СкопироватьЖурналРегистрации|CopyEventLog|ОчиститьЖурналРегистрации|ClearEventLog|" +
            "ЗначениеВДанныеФормы|ValueToFormData|ДанныеФормыВЗначение|FormDataToValue|КопироватьДанныеФормы|CopyFormData|УстановитьСоответствиеОбъектаИФормы|SetObjectAndFormConformity|ПолучитьСоответствиеОбъектаИФормы|GetObjectAndFormConformity|" +
            "ПолучитьФункциональнуюОпцию|GetFunctionalOption|ПолучитьФункциональнуюОпциюИнтерфейса|GetInterfaceFunctionalOption|УстановитьПараметрыФункциональныхОпцийИнтерфейса|SetInterfaceFunctionalOptionParameters|ПолучитьПараметрыФункциональныхОпцийИнтерфейса|GetInterfaceFunctionalOptionParameters|ОбновитьИнтерфейс|RefreshInterface|" +
            "УстановитьРасширениеРаботыСКриптографией|InstallCryptoExtension|НачатьУстановкуРасширенияРаботыСКриптографией|BeginInstallCryptoExtension|ПодключитьРасширениеРаботыСКриптографией|AttachCryptoExtension|НачатьПодключениеРасширенияРаботыСКриптографией|BeginAttachingCryptoExtension|" +
            "УстановитьСоставСтандартногоИнтерфейсаOData|SetStandardODataInterfaceContent|ПолучитьСоставСтандартногоИнтерфейсаOData|GetStandardODataInterfaceContent|" +
            "Мин|Min|Макс|Max|ОписаниеОшибки|ErrorDescription|Вычислить|Eval|ИнформацияОбОшибке|ErrorInfo|Base64Значение|Base64Value|Base64Строка|Base64String|ЗаполнитьЗначенияСвойств|FillPropertyValues|ЗначениеЗаполнено|ValueIsFilled|ПолучитьПредставленияНавигационныхСсылок|GetURLsPresentations|НайтиОкноПоНавигационнойСсылке|FindWindowByURL|ПолучитьОкна|GetWindows|ПерейтиПоНавигационнойСсылке|GotoURL|ПолучитьНавигационнуюСсылку|GetURL|ПолучитьДопустимыеКодыЛокализации|GetAvailableLocaleCodes|ПолучитьНавигационнуюСсылкуИнформационнойБазы|GetInfoBaseURL|ПредставлениеКодаЛокализации|LocaleCodePresentation|ПолучитьДопустимыеЧасовыеПояса|GetAvailableTimeZones|ПредставлениеЧасовогоПояса|TimeZonePresentation|ТекущаяУниверсальнаяДата|CurrentUniversalDate|ТекущаяУниверсальнаяДатаВМиллисекундах|CurrentUniversalDateInMilliseconds|МестноеВремя|ToLocalTime|УниверсальноеВремя|ToUniversalTime|ЧасовойПояс|TimeZone|СмещениеЛетнегоВремени|DaylightTimeOffset|СмещениеСтандартногоВремени|StandardTimeOffset|КодироватьСтроку|EncodeString|РаскодироватьСтроку|DecodeString|Найти|Find|" +
            "ПередНачаломРаботыСистемы|BeforeStart|ПриНачалеРаботыСистемы|OnStart|ПередЗавершениемРаботыСистемы|BeforeExit|ПриЗавершенииРаботыСистемы|OnExit|ОбработкаВнешнегоСобытия|ExternEventProcessing|УстановкаПараметровСеанса|SessionParametersSetting|ПриИзмененииПараметровЭкрана|OnChangeDisplaySettings|"
        );
        var dataTypes = (
            "константы|справочники|документы|журналыдокументов|перечисления|регистрысведений|регистрынакопления|отчеты|обработки" +
            "планывидовхарактеристик|планыобмена|параметрысеанса|роли|общиереквизиты|общиеформы|общиемакеты|критерииотбора"+
            "Запрос, ЗаписьJSON"
        );

        var supportClass = (
            "WSСсылки|WSReferences|БиблиотекаКартинок|PictureLib|БиблиотекаМакетовОформленияКомпоновкиДанных|DataCompositionAppearanceTemplateLib|БиблиотекаСтилей|StyleLib|БизнесПроцессы|BusinessProcesses|ВнешниеИсточникиДанных|ExternalDataSources|ВнешниеОбработки|ExternalDataProcessors|ВнешниеОтчеты|ExternalReports|Документы|Documents|ДоставляемыеУведомления|DeliverableNotifications|ЖурналыДокументов|DocumentJournals|Задачи|Tasks|ИспользованиеРабочейДаты|WorkingDateUse|ИсторияРаботыПользователя|UserWorkHistory|Константы|Constants|КритерииОтбора|FilterCriteria|Метаданные|Metadata|Обработки|DataProcessors|ОтправкаДоставляемыхУведомлений|DeliverableNotificationSend|Отчеты|Reports|ПараметрыСеанса|SessionParameters|Перечисления|Enums|ПланыВидовРасчета|ChartsOfCalculationTypes|ПланыВидовХарактеристик|ChartsOfCharacteristicTypes|ПланыОбмена|ExchangePlans|ПланыСчетов|ChartsOfAccounts|ПолнотекстовыйПоиск|FullTextSearch|ПользователиИнформационнойБазы|InfoBaseUsers|Последовательности|Sequences|РасширенияКонфигурации|ConfigurationExtensions|РегистрыБухгалтерии|AccountingRegisters|РегистрыНакопления|AccumulationRegisters|РегистрыРасчета|CalculationRegisters|РегистрыСведений|InformationRegisters|РегламентныеЗадания|ScheduledJobs|СериализаторXDTO|XDTOSerializer|Справочники|Catalogs|СредстваГеопозиционирования|LocationTools|СредстваКриптографии|CryptoToolsManager|СредстваМультимедиа|MultimediaTools|СредстваПочты|MailTools|СредстваТелефонии|TelephonyTools|ФабрикаXDTO|XDTOFactory|ФоновыеЗадания|BackgroundJobs|ХранилищаНастроек|SettingsStorages|ВстроенныеПокупки|InAppPurchases|ОтображениеРекламы|AdRepresentationПанельЗадачОС|OSTaskbar|ПроверкаВстроенныхПокупок|InAppPurchasesValidation"
        );

        var variableLanguage = (
            "ГлавныйИнтерфейс|MainInterface|ГлавныйСтиль|MainStyle|ПараметрЗапуска|LaunchParameter|РабочаяДата|WorkingDate|ХранилищеВариантовОтчетов|ReportsVariantsStorage|ХранилищеНастроекДанныхФорм|FormDataSettingsStorage|ХранилищеОбщихНастроек|CommonSettingsStorage|ХранилищеПользовательскихНастроекДинамическихСписков|DynamicListsUserSettingsStorage|ХранилищеПользовательскихНастроекОтчетов|ReportsUserSettingsStorage|ХранилищеСистемныхНастроек|SystemSettingsStorage"
        );


        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "support.class": supportClass,
            "keyword": keywords,
            "constant.language": builtinConstants,
            "types": dataTypes,
            "variable.language": variableLanguage
        }, "identifier");


        this.$rules = {
            "start" : [ {
                token : "comment",
                regex : "\/\/.*"
            },
            {
                token: "preprocessor.region",
                regex: "(^[ \t]*#(?:Область|КонецОбласти).*$)"
            },
            {
                token: "preprocessor.anotation",
                regex: "(^[ \t]*&.*$)"
            },
            {
                token: "preprocessor.instruction",
                regex: /#(?:Если|If|ИначеЕсли|ElsIf|Иначе|Else|КонецЕсли|EndIf).*(?:Тогда|Then)?/,
                caseInsensitive: true
            },
            {
                token: keywordMapper,
                regex: "[_A-Za-zА-ЯЁа-яё][_A-Za-z0-9А-ЯЁа-яё]*",
                caseInsensitive: true
            },
            {
                token : "label",
                regex : "~(\u0020|\t)*[_A-Za-zА-ЯЁа-яё][_A-Za-z0-9А-ЯЁа-яё]*(\u0020|\t)*:"
            },
            // {
            //     token : "string.oneline",           // ' string
            //     // regex : "\"{1,1}[^\"]*\"{1,1}"
            //     regex : "(\"[^\"]*\"(?:\"[^\"]*\")*)"
            // },
            {
                token : "identifier", // ' identifier
                regex : "[_A-Za-zА-ЯЁа-яё][_A-Za-z0-9А-ЯЁа-яё]*"
            },
            {
                token : "doubleoperator", // ' doubleoperator
                regex : "<=|<>|>="
            },
            {
                token : "singleoperator", // ' singleoperator
                regex : "[\\+\\-\\*/%&<>=\?]"
            },
            {
                token : "number", // ' number
                regex : /\b(?:[\da-fA-F]{8}-(?:[\da-fA-F]{4}-){3}[\da-fA-F]{12}|\d+\.?\d*)\b/
            },
            {
                token : "paren.lparen",
                regex : "[\\(]"
            },
            {
                token : "paren.rparen",
                regex : "[\\)]"
            },
            {
                token : "paren.lsqare",
                regex : "[\\[]"
            },
            {
                token : "paren.rsqare",
                regex : "[\\]]"
            },
            {
                token : "paren.semicolon",
                regex : "[\\;]"
            },
            {
                token : "paren.comma",
                regex : "[\\,]"
            },
            {
                token: "string.quoted.double.bsl",
                regex: /\"/,
                push: [{
                    token: "string.quoted.double.bsl",
                    regex: /\"(?![\"])/,
                    next: "pop"
                }, {
                        include: "#query"
                    }, {
                        token: "constant.character.escape.bsl",
                        regex: /\"\"/
                    }, {
                        token: "comment.line.double-slash.bsl",
                        regex: /^\s*\/\/.*$/
                    }, {
                        defaultToken: "string.quoted.double.bsl"
                    }]
            }

        ],
        "#query": [{
            token: "keyword.control.sdbl",
            regex: /\b(?:Выбрать|Select(?:\s+Разрешенные|Allowed)?(?:\s+Различные|Distinct)?(?:\s+Первые|Top)?)\b/,
            caseInsensitive: true,
            push: [{
                token: "text",
                regex: /(?=\"[^\"])/,
                next: "pop"
            }, {
                    token: "comment.line.double-slash.bsl",
                    regex: /^\s*\/\//,
                    push: [{
                        token: "comment.line.double-slash.bsl",
                        regex: /$/,
                        next: "pop"
                    }, {
                            defaultToken: "comment.line.double-slash.bsl"
                        }]
                }, {
                    token: "comment.line.double-slash.sdbl",
                    regex: /\/\/(?:\"\"|[^\"])*/
                }, {
                    token: "string.quoted.double.sdbl",
                    regex: /\"\"[^"]*\"\"/
                }, {
                    include: "source.sdbl"
                }]
        }],
        };
        this.normalizeRules();
    };

    oop.inherits(_1CHighlightRules, TextHighlightRules);

    exports._1CHighlightRules = _1CHighlightRules;
    });