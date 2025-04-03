import { notFound } from "next/navigation";
import { AppLocale } from "./locales";
import { APP_LOCALES } from "./constants";
import MainPage from "../../pages/MainPage";

type Props = {
  params: Promise<{ locale: AppLocale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  
  // in normal cases, locale should be a valid locale
  // but sometimes it's not so we should just return 404
  if (!APP_LOCALES.includes(locale)) return notFound();
  return (
    <MainPage/>
  );
}