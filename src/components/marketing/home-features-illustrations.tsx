import type { FeatureIllustrationId } from "@/data/home-features-content";

import styles from "./home-features-section.module.css";

type FeatureIllustrationProps = {
  id: FeatureIllustrationId;
  wide?: boolean;
};

export function FeatureIllustration({ id, wide = false }: FeatureIllustrationProps) {
  const className = wide ? styles.illusSvgWide : styles.illusSvg;

  switch (id) {
    case "live-calls":
      return (
        <svg viewBox="0 0 440 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="14" width="90" height="132" rx="10" fill="#fff" stroke="#CECBF6" strokeWidth="1" />
          <circle cx="75" cy="26" r="4" fill="#CECBF6" />
          <rect x="45" y="36" width="60" height="70" rx="4" fill="#F8F7FF" />
          <polyline
            points="48,72 54,60 60,80 66,55 72,78 78,65 84,75 90,58 96,72 102,68"
            fill="none"
            stroke="#7F77DD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="45" y="114" width="60" height="20" rx="4" fill="#7F77DD" />
          <text x="75" y="128" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500">
            AI Speaking...
          </text>
          <line x1="122" y1="80" x2="158" y2="80" stroke="#CECBF6" strokeWidth="1" strokeDasharray="4,3" />
          <circle cx="140" cy="80" r="3" fill="#7F77DD" />
          <rect x="158" y="30" width="120" height="100" rx="8" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="0.5" />
          <text x="218" y="54" textAnchor="middle" fontSize="9" fill="#534AB7" fontWeight="500">
            AI AGENT
          </text>
          <path d="M190,75 Q200,65 210,75 Q220,85 230,75" fill="none" stroke="#7F77DD" strokeWidth="1.5" />
          <path d="M183,75 Q198,58 213,75 Q228,92 243,75" fill="none" stroke="#AFA9EC" strokeWidth="1" />
          <path d="M176,75 Q197,52 218,75 Q239,98 260,75" fill="none" stroke="#CECBF6" strokeWidth="0.5" />
          <rect x="168" y="100" width="80" height="14" rx="3" fill="#E1F5EE" />
          <text x="208" y="111" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
            ● Live — Handling call
          </text>
          <line x1="280" y1="80" x2="316" y2="80" stroke="#CECBF6" strokeWidth="1" strokeDasharray="4,3" />
          <circle cx="298" cy="80" r="3" fill="#7F77DD" />
          <rect x="316" y="30" width="104" height="100" rx="8" fill="#fff" stroke="#CECBF6" strokeWidth="0.5" />
          <text x="368" y="50" textAnchor="middle" fontSize="8" fill="#888780" fontWeight="500">
            CRM Updated
          </text>
          <rect x="326" y="56" width="76" height="6" rx="2" fill="#AFA9EC" />
          <rect x="326" y="68" width="60" height="5" rx="2" fill="#E8E6DF" />
          <rect x="326" y="78" width="70" height="5" rx="2" fill="#E8E6DF" />
          <rect x="326" y="88" width="50" height="5" rx="2" fill="#E8E6DF" />
          <rect x="326" y="100" width="76" height="18" rx="3" fill="#EEEDFE" />
          <text x="364" y="113" textAnchor="middle" fontSize="8" fill="#3C3489" fontWeight="500">
            Auto-logged ✓
          </text>
        </svg>
      );
    case "scheduling":
      return (
        <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="20" width="160" height="120" rx="8" fill="#fff" stroke="#A3D9BE" strokeWidth="0.5" />
          <rect x="30" y="20" width="160" height="28" rx="8" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
          <rect x="30" y="40" width="160" height="8" fill="#E1F5EE" />
          <text x="110" y="38" textAnchor="middle" fontSize="10" fill="#085041" fontWeight="500">
            June 2025
          </text>
          {["M", "T", "W", "T", "F", "S"].map((day, i) => (
            <text key={day + i} x={50 + i * 23} y="60" textAnchor="middle" fontSize="8" fill="#888780">
              {day}
            </text>
          ))}
          {[2, 3, 4, 5, 6].map((date, i) => (
            <text key={date} x={50 + i * 23} y="78" textAnchor="middle" fontSize="9" fill="#444441">
              {date}
            </text>
          ))}
          <text x="165" y="78" textAnchor="middle" fontSize="9" fill="#888780">
            7
          </text>
          <text x="50" y="98" textAnchor="middle" fontSize="9" fill="#444441">
            9
          </text>
          <text x="73" y="98" textAnchor="middle" fontSize="9" fill="#444441">
            10
          </text>
          <circle cx="96" cy="94" r="11" fill="#085041" />
          <text x="96" y="98" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500">
            11
          </text>
          <text x="119" y="98" textAnchor="middle" fontSize="9" fill="#444441">
            12
          </text>
          <text x="142" y="98" textAnchor="middle" fontSize="9" fill="#444441">
            13
          </text>
          <text x="165" y="98" textAnchor="middle" fontSize="9" fill="#888780">
            14
          </text>
          <rect x="38" y="110" width="144" height="20" rx="4" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
          <text x="110" y="124" textAnchor="middle" fontSize="9" fill="#085041" fontWeight="500">
            ✓ Booked — Wed 11th, 2:00 PM
          </text>
        </svg>
      );
    case "multilingual":
      return (
        <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="78" r="48" fill="#E6F1FB" stroke="#9AC4EF" strokeWidth="0.5" />
          <ellipse cx="110" cy="78" rx="22" ry="48" fill="none" stroke="#9AC4EF" strokeWidth="0.5" />
          <line x1="62" y1="78" x2="158" y2="78" stroke="#9AC4EF" strokeWidth="0.5" />
          <line x1="67" y1="58" x2="153" y2="58" stroke="#9AC4EF" strokeWidth="0.5" />
          <line x1="67" y1="98" x2="153" y2="98" stroke="#9AC4EF" strokeWidth="0.5" />
          {[
            { x: 36, y: 32, label: "EN" },
            { x: 184, y: 32, label: "HI" },
            { x: 36, y: 136, label: "ES" },
            { x: 184, y: 136, label: "FR" },
          ].map(({ x, y, label }) => (
            <g key={label}>
              <rect
                x={x - 18}
                y={y - 12}
                width="36"
                height="16"
                rx="8"
                fill="#fff"
                stroke="#9AC4EF"
                strokeWidth="0.5"
              />
              <text x={x} y={y} textAnchor="middle" fontSize="9" fill="#0C447C">
                {label}
              </text>
            </g>
          ))}
          <line x1="54" y1="28" x2="80" y2="50" stroke="#9AC4EF" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="166" y1="28" x2="140" y2="50" stroke="#9AC4EF" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="54" y1="132" x2="80" y2="110" stroke="#9AC4EF" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="166" y1="132" x2="140" y2="110" stroke="#9AC4EF" strokeWidth="0.5" strokeDasharray="3,2" />
          <rect x="82" y="64" width="56" height="28" rx="6" fill="#fff" stroke="#9AC4EF" strokeWidth="0.5" />
          <text x="110" y="75" textAnchor="middle" fontSize="8" fill="#888780">
            100+
          </text>
          <text x="110" y="87" textAnchor="middle" fontSize="8" fill="#0C447C" fontWeight="500">
            Languages
          </text>
        </svg>
      );
    case "lead-qualification":
      return (
        <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,25 180,25 150,70 70,70" fill="#FAEEDA" stroke="#E6C07A" strokeWidth="0.5" />
          <polygon points="70,72 150,72 130,105 90,105" fill="#F5D49A" stroke="#E6C07A" strokeWidth="0.5" />
          <polygon points="90,107 130,107 118,130 102,130" fill="#EFA830" stroke="#E6C07A" strokeWidth="0.5" />
          {[68, 110, 152].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="18" r="6" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
              <text x={cx} y="22" textAnchor="middle" fontSize="8" fill="#633806">
                L
              </text>
            </g>
          ))}
          <rect x="74" y="135" width="72" height="18" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
          <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
            ✓ Qualified Lead
          </text>
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="18" width="180" height="124" rx="8" fill="#fff" stroke="#F7C1C1" strokeWidth="0.5" />
          <rect x="20" y="18" width="180" height="20" rx="8" fill="#FCEBEB" stroke="#F7C1C1" strokeWidth="0.5" />
          <rect x="20" y="30" width="180" height="8" fill="#FCEBEB" />
          <text x="110" y="32" textAnchor="middle" fontSize="8" fill="#A32D2D" fontWeight="500">
            Call Analytics Dashboard
          </text>
          <rect x="30" y="46" width="72" height="36" rx="4" fill="#FCEBEB" />
          <text x="66" y="60" textAnchor="middle" fontSize="18" fill="#A32D2D" fontWeight="500">
            94%
          </text>
          <text x="66" y="76" textAnchor="middle" fontSize="7" fill="#A32D2D">
            Resolution rate
          </text>
          <rect x="118" y="46" width="72" height="36" rx="4" fill="#E1F5EE" />
          <text x="154" y="60" textAnchor="middle" fontSize="18" fill="#085041" fontWeight="500">
            4.8★
          </text>
          <text x="154" y="76" textAnchor="middle" fontSize="7" fill="#085041">
            Avg CSAT score
          </text>
          <rect x="30" y="92" width="160" height="40" rx="4" fill="#F8F7FF" />
          {[40, 58, 76, 94, 112, 130, 148].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={116 - [10, 18, 26, 22, 30, 24, 28][i]}
              width="12"
              height={[10, 18, 26, 22, 30, 24, 28][i]}
              rx="1"
              fill={["#AFA9EC", "#7F77DD", "#534AB7", "#7F77DD", "#3C3489", "#534AB7", "#3C3489"][i]}
            />
          ))}
          <text x="110" y="142" textAnchor="middle" fontSize="7" fill="#888780">
            Call volume — last 7 days
          </text>
        </svg>
      );
    case "integrations":
      return (
        <svg viewBox="0 0 440 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <circle cx="220" cy="80" r="28" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="1" />
          <text x="220" y="75" textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
            AI
          </text>
          <text x="220" y="88" textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
            AGENT
          </text>
          <line x1="192" y1="80" x2="140" y2="80" stroke="#CECBF6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="248" y1="80" x2="300" y2="80" stroke="#CECBF6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="210" y1="54" x2="180" y2="28" stroke="#CECBF6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="230" y1="54" x2="260" y2="28" stroke="#CECBF6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="210" y1="106" x2="180" y2="132" stroke="#CECBF6" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="230" y1="106" x2="260" y2="132" stroke="#CECBF6" strokeWidth="0.5" strokeDasharray="3,2" />
          {[
            { x: 82, y: 62, w: 58, h: 36, title: "Salesforce", sub: "CRM" },
            { x: 300, y: 62, w: 58, h: 36, title: "HubSpot", sub: "CRM" },
            { x: 140, y: 12, w: 60, h: 30, title: "Calendly", sub: "Scheduling" },
            { x: 240, y: 12, w: 60, h: 30, title: "Twilio", sub: "Voice" },
            { x: 140, y: 118, w: 60, h: 30, title: "Zapier", sub: "Automation" },
            { x: 240, y: 118, w: 60, h: 30, title: "Slack", sub: "Alerts" },
          ].map(({ x, y, w, h, title, sub }) => (
            <g key={title}>
              <rect x={x} y={y} width={w} height={h} rx="6" fill="#fff" stroke="#CECBF6" strokeWidth="0.5" />
              <text x={x + w / 2} y={y + 16} textAnchor="middle" fontSize="8" fill="#888780">
                {title}
              </text>
              <text x={x + w / 2} y={y + 28} textAnchor="middle" fontSize="7" fill="#AFA9EC">
                {sub}
              </text>
            </g>
          ))}
          <rect x="174" y="68" width="92" height="24" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
          <text x="220" y="84" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
            ● All connected
          </text>
        </svg>
      );
    default:
      return null;
  }
}
