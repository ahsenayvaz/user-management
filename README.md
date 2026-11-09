# Kullanıcı Yönetimi

NestJS (REST API, JWT), Angular ve PostgreSQL ile yazılmış basit bir kullanıcı yönetim uygulaması.

Yönetici kullanıcıları listeleyebilir, detayına bakabilir, ekleyebilir, güncelleyebilir ve silebilir. Standart kullanıcı sadece kullanıcı listesini görebilir.

## Docker ile çalıştırma

Docker kuruluysa tek komut yeterli (veritabanı, backend ve frontend birlikte açılır):

```bash
docker compose up --build
```

İlk açılış birkaç dakika sürer. Terminalde `Nest application successfully started` yazısını gördükten sonra http://localhost:4200 adresini açın. 3000 ve 4200 portlarının boş olması gerekir.

Durdurmak için `Ctrl + C`, ardından `docker compose down`. Veritabanındaki kayıtları da silmek için `docker compose down -v`.

## Docker olmadan çalıştırma

Gereksinimler: Node.js 24.15 veya üzeri ve PostgreSQL 16. PostgreSQL'de `usermgmt` adında boş bir veritabanı oluşturun (kullanıcı `postgres`, şifre `postgres`, port `5432`).

Backend (http://localhost:3000):

```bash
cd backend
npm install
npm run start
```

Ayrı bir terminalde frontend (http://localhost:4200):

```bash
cd frontend
npm install
npm start
```

Veritabanı bilgileri `DB_HOST`, `DB_USER`, `DB_PASS` ve `DB_NAME` ortam değişkenleriyle değiştirilebilir. JWT anahtarı için `JWT_SECRET` kullanılır.

## Giriş bilgileri

Tablo ilk açılışta kendiliğinden oluşur ve iki kullanıcı eklenir:

- Yönetici: `admin` / `admin123`
- Standart kullanıcı: `user` / `user123`

## API

Giriş yapmak için `POST /auth/login` kullanılır. Dönen token, diğer isteklerde `Authorization: Bearer <token>` başlığıyla gönderilir.

```
GET     /users        kullanıcı listesi (giriş yapmış herkes)
GET     /users/:id    kullanıcı detayı (yönetici)
POST    /users        kullanıcı ekleme (yönetici)
PUT     /users/:id    kullanıcı güncelleme (yönetici)
DELETE  /users/:id    kullanıcı silme (yönetici)
```

## Notlar

Şifreler bcrypt ile saklanır ve API cevaplarında dönmez. Yetki kontrolü backend'de yapılır, arayüzde sadece yetkisiz butonlar gizlenir. Basit tutmak için `synchronize: true` kullanıldı, gerçek bir projede migration tercih edilir.
