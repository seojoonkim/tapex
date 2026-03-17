import Link from 'next/link';

const footerLinks = [
  {
    title: '시험안내',
    links: [
      { label: '시험 구조', href: '/exam' },
      { label: '점수·등급', href: '/exam/scoring' },
      { label: '응시료', href: '/pricing' },
    ],
  },
  {
    title: '자격증',
    links: [
      { label: '등급 배지', href: '/exam/scoring' },
      { label: '마이크로 배지', href: '/exam/scoring' },
      { label: '블록체인 인증', href: '/exam/scoring' },
    ],
  },
  {
    title: '기업',
    links: [
      { label: '기업 도입', href: '/enterprise' },
      { label: '교육기관', href: '/enterprise' },
      { label: '파트너십', href: '/enterprise' },
    ],
  },
  {
    title: '고객지원',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: '문의하기', href: '/enterprise' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-display text-3xl text-white">TAPEX</span>
            <p className="mt-2 text-sm text-gray-400">
              Prove Your Prompt. Power Your Future.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          &copy; 2026 TAPEX. 한국경제신문 인증. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
