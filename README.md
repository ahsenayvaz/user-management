# Kullanıcı Yönetimi

Kullanıcıların yönetildiği basit bir web uygulaması. Backend NestJS, frontend Angular, veritabanı PostgreSQL ile yazıldı.

## Kurulum

Bilgisayarda Docker kurulu olmalıdır. Proje klasöründe şu komutu çalıştırın:

```bash
docker compose up --build
```

İlk açılış birkaç dakika sürer. Terminalde `Nest application successfully started` yazısını gördükten sonra tarayıcıda http://localhost:4200 adresini açın. 3000 ve 4200 portlarının boş olması gerekir.

Durdurmak için `Ctrl + C` yapıp `docker compose down` yazın.

İlk açılışta iki kullanıcı otomatik oluşturulur:

- Yönetici: `admin` / `admin123`
- Standart kullanıcı: `user` / `user123`

## Özellikler

Uygulamaya kullanıcı adı ve şifre ile giriş yapılır. Giriş JWT ile doğrulanır, oturum sayfa yenilense de açık kalır.

İki rol vardır:

- **Yönetici:** Kullanıcıları listeleyebilir, detayını görebilir, yeni kullanıcı ekleyebilir, güncelleyebilir ve silebilir.
- **Standart kullanıcı:** Sadece kullanıcı listesini görebilir.

Yetki kontrolü backend'de yapılır, yani arayüzü atlayıp doğrudan API'ye istek atmak da yetkisiz kullanıcılara izin vermez. Şifreler bcrypt ile saklanır ve hiçbir cevapta dönmez. Girilen bilgiler doğrulanır, aynı kullanıcı adı iki kez kullanılamaz.
