# ⛏️ Revilink Veri Kazıyıcı Hüküm Koşulları

Revilink web sitesi ("Uygulama"), kullanıcıların talepleri doğrultusunda, otomatik veya manuel olarak, uzak web bağlantılarından veri toplayabilir. Bu veriler, kullanıcıya sunulmak üzere işlenir ve ilgili alanlarda gösterilir. Bu, Revilink uygulamasının temel işlevselliğini sağlamak için gereklidir.

**Veri Kazıma Protokolleri**

Uygulama, bağlantı sahibinin kazıma işlemine izin vermediği durumlar hariç, bağlantılardan veri kazıyabilir. Kazınan veriler genellikle halka açık meta bilgileri, web sayfası başlığı, web sayfası ikonu, oluşturulma tarihi ve diğer spesifik verileri içerir.

Uygulama, kazıma işlemi sırasında bağlantıya sahip olan web sayfası üzerinde herhangi bir manipülasyon, veri değiştirme veya veri yerleştirme yapmaz. Ayrıca, bağlantıya ait olan sunucu üzerinde kasıtlı olarak stres veya yük işlemi gerçekleştirmez.

**Kullanıcı Yükümlülükleri ve Sorumlulukları**

Bağlantıya ait web sayfası sahibi, sayfasına erişebilen herkes için kullanıcı yükünü taahhüt eder. Revilink'in yükü istenmediği durumlar için, bu belgede belirtilen engelleme yöntemleri kullanılabilir.

## Revilink Veri Kazıyıcısının Engellenmesi

Revilink Veri Kazıyıcısı, bağlantı sahibi tarafından çeşitli yöntemlerle engellenebilir. Uygulama, robots ve meta etiketi belirlemelerine saygı gösterir ve bağlantı sahibi tarafından engellenmediği sürece veri kazıma işlemi gerçekleştirir.

### Engelleme Türleri

**RevilinkBot no-scrape meta etiketi ile spesifik rotada engellenmesi**

```
<meta name="RevilinkBot" content="no-scrape">
```

<br>

**robots.txt üzerinde tüm User-agent tanımlaması spesifik rota kısıtlanması ile engellenmesi**

```
User-agent: *
Disallow: /abc/abc.html
```

<br>

**robots.txt üzerinde tüm User-agent tanımlaması path kısıtlanması ile engellenmesi**

```
User-agent: *
Disallow: /abc
```

<br>

**robots.txt üzerinde tüm User-agent tanımlaması kısıtlanması ile engellenmesi**

```
User-agent: *
Disallow: *
```

<br>

**robots.txt üzerinde RevilinkBot User-agent tanımlaması spesifik rota kısıtlanması ile engellenmesi**

```
User-agent: RevilinkBot
Disallow: /abc/abc.html
```

<br>

**robots.txt üzerinde RevilinkBot User-agent tanımlaması ile tüm rotalarda engellenmesi**

```
User-agent: RevilinkBot
Disallow: /abc
```

<br>

**robots.txt üzerinde RevilinkBot User-agent tanımlaması ile tüm rotalarda engellenmesi**

```
User-agent: RevilinkBot
Disallow: *
```

<br>

**Hukuki Uyarı**

Revilink, kazıma işlemi sonucu elde edilen verilerin doğruluğunu, güncelliğini ve bütünlüğünü garanti etmez. Kullanıcılar, bu verileri kendi sorumlulukları altında kullanır. Revilink, bu verilerin kullanımından kaynaklanabilecek herhangi bir zarar veya kayıp için sorumlu tutulamaz.

**Değişiklikler**

Revilink, bu hüküm ve koşulları önceden haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler, yayınlandıkları andan itibaren geçerli olacaktır.

**Hukuki Yetki**

Bu hüküm ve koşullar, Türkiye Cumhuriyeti yasalarına, özellikle Kişisel Verilerin Korunması Kanunu (No. 6698), Türk Ceza Kanunu ve Elektronik Ticaretin Düzenlenmesi Hakkında Kanun’a tabidir. Herhangi bir anlaşmazlık durumunda, taraflar Türkiye Cumhuriyeti mahkemelerine başvurma hakkına sahiptir.

[revilink.io@gmail.com](mailto:revilink.io@gmail.com)
