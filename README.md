# מעגנה - Maagane

אתר לקואופרטיב מעגנה - בית משלנו על המים.

## התקנה

```bash
npm install
```

## הגדרת משתני סביבה

צור קובץ `.env.local` והכנס את כתובת מסד הנתונים:

```
DATABASE_URL=postgresql://neondb_owner:npg_ksW0F7wifreJ@ep-dry-dust-ah5yy064-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## הרצה

לפיתוח:
```bash
npm run dev
```

לבנייה:
```bash
npm run build
```

להרצה בפרודקשן:
```bash
npm start
```

## טכנולוגיות

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- PostgreSQL (Neon)
- Lucide React (אייקונים)

## פריסה

הפרויקט מוכן לפריסה ב-Vercel עם פריסה אחת בלבד:
- Frontend + API routes בפריסה אחת
- מסד הנתונים מתחבר אוטומטית דרך משתני הסביבה

