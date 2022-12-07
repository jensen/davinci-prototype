interface BaseFormatter {
  content: string | null;
  tone: string | null;
  brand: string | null;
  custom: string | null;
}

interface EmailFormatter extends BaseFormatter {
  type: string | null;
}

interface WebsiteFormatter extends BaseFormatter {
  section: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
