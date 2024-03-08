export interface Question {
  id: number;
  text: { en: string, ua: string };
  options: { en: string[], ua: string[] };
  correctAnswers: { en: string[], ua: string[] };
  prize: number;
}
