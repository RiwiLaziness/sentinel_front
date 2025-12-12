import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Attack Surface');

  // Threat severity data
  const threats = [
    { name: 'Exploited', value: 45, total: 45, color: '#ef4444' },
    { name: 'Critical', value: 15, total: 15, color: '#dc2626' },
    { name: 'High', value: 55, total: 55, color: '#f59e0b' },
    { name: 'Medium', value: 65, total: 65, color: '#eab308' },
    { name: 'Low', value: 85, total: 85, color: '#22c55e' }
  ];

  // ASN Ownership data
  const asnData = [
    { month: 'Jan', wade: 180, jenny: 0, guy: 0 },
    { month: 'Feb', wade: 140, jenny: 0, guy: 0 },
    { month: 'Mar', wade: 0, jenny: 280, guy: 0 },
    { month: 'Apr', wade: 0, jenny: 0, guy: 220 },
    { month: 'May', wade: 0, jenny: 0, guy: 260 },
    { month: 'Jun', wade: 0, jenny: 0, guy: 200 }
  ];

  const exposedPorts = [
    { port: 70000, percentage: 28, label: '28%' },
    { port: 70000, percentage: 85, label: '85%' },
    { port: 70000, percentage: 65, label: '65%' },
    { port: 70000, percentage: 100, label: '100%' },
    { port: 70000, percentage: 65, label: '65%' }
  ];

  const createCircularProgress = (value: number, total: number, color: string) => {
    const percentage = (value / total) * 100;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r="45" stroke="#1f2937" strokeWidth="8" fill="none" />
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f3027 0%, #1a1a2e 100%)',
      color: '#e5e7eb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div className="columns is-gapless" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <div className="column is-narrow" style={{ 
          width: '240px', 
          background: '#0d1117',
          borderRight: '1px solid #1f2937',
          padding: '1.5rem 0'
        }}>
          <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                An
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Anarisk</span>
            </div>
          </div>

          <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
            <input 
              type="text" 
              placeholder="Search" 
              className="input is-small"
              style={{ 
                background: '#1f2937',
                border: '1px solid #374151',
                color: '#9ca3af',
                borderRadius: '6px'
              }}
            />
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            <p style={{ 
              padding: '0.5rem 1.5rem', 
              fontSize: '0.75rem', 
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Main Menu
            </p>
            {['Dashboard', 'Attack Surface', 'Dark Web', 'Threat Exposure', 'Issues', 'Risk Score', 'Reports', 'Settings', 'Support'].map((item) => (
              <div
                key={item}
                onClick={() => setActiveMenu(item)}
                style={{
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  background: activeMenu === item ? '#1e3a8a' : 'transparent',
                  borderLeft: activeMenu === item ? '3px solid #3b82f6' : '3px solid transparent',
                  color: activeMenu === item ? '#fff' : '#9ca3af',
                  transition: 'all 0.2s'
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="column" style={{ padding: '2rem', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '600' }}>Attack Surface Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="button is-ghost" style={{ color: '#9ca3af' }}>🔔</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  A
                </div>
                <span style={{ fontSize: '0.9rem' }}>Abdulmomen</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="columns is-multiline" style={{ marginBottom: '1.5rem' }}>
            {[
              { label: 'Domains', value: '12', change: '+8.6%', positive: true, subtitle: 'For Last month' },
              { label: 'Subdomains', value: '373', change: '+4.3%', positive: true, subtitle: 'For Last month' },
              { label: 'IPs', value: '369', change: '-2.18%', positive: false, subtitle: 'For Last month' },
              { label: 'Dormant', value: '15', change: '+9.5%', positive: true, subtitle: 'For Last month' },
              { label: 'Ports', value: '4,704', change: '+3.7%', positive: true, subtitle: 'For Last month' }
            ].map((stat, i) => (
              <div key={i} className="column is-one-fifth">
                <div style={{ 
                  background: '#1a1d29',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #2d3748'
                }}>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                  <p style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>{stat.value}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem',
                      color: stat.positive ? '#22c55e' : '#ef4444',
                      background: stat.positive ? '#16a34a20' : '#dc262620',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {stat.change}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{stat.subtitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="columns">
            {/* Dark Web Risk Level */}
            <div className="column is-one-third">
              <div style={{ 
                background: '#1a1d29',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #2d3748',
                height: '300px'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Dark Web Risk Level:</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', position: 'relative' }}>
                  <svg width="220" height="120" viewBox="0 0 220 120">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20,110 A 90,90 0 0,1 200,110"
                      fill="none"
                      stroke="#2d3748"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20,110 A 90,90 0 0,1 155,35"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <circle cx="110" cy="110" r="8" fill="#fff" />
                    <line x1="110" y1="110" x2="155" y2="35" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <div style={{ 
                    position: 'absolute',
                    bottom: '20px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>75%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Exposures Severity */}
            <div className="column is-two-thirds">
              <div style={{ 
                background: '#1a1d29',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #2d3748',
                height: '300px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Threat Exposures Severity</h3>
                  <button style={{ 
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}>
                    View All →
                  </button>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  height: '200px'
                }}>
                  {threats.map((threat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        {createCircularProgress(threat.value, threat.total, threat.color)}
                        <div style={{ 
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '1.25rem',
                          fontWeight: '700'
                        }}>
                          {threat.value}
                        </div>
                      </div>
                      <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#9ca3af' }}>{threat.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="columns" style={{ marginTop: '1.5rem' }}>
            {/* Global Footprint */}
            <div className="column is-one-third">
              <div style={{ 
                background: '#1a1d29',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #2d3748',
                height: '320px'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Global Footprint</h3>
                <div style={{ position: 'relative', height: '200px', background: '#0d1117', borderRadius: '8px', marginBottom: '1rem' }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    World Map Visualization
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { country: 'USA', count: 13, percentage: 16 },
                    { country: 'Canada', count: 11, percentage: 10 },
                    { country: 'China', count: 8, percentage: 10 }
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.85rem' }}>{item.country} ({item.count})</span>
                        <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{item.percentage}%</span>
                      </div>
                      <div style={{ 
                        height: '4px',
                        background: '#2d3748',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${item.percentage}%`,
                          height: '100%',
                          background: '#3b82f6'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ASN Ownership */}
            <div className="column is-one-third">
              <div style={{ 
                background: '#1a1d29',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #2d3748',
                height: '320px'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>ASN Ownership</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                    <span>Wade Warren</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                    <span>Jenny Wilson</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                    <span>Guy Hawkins</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px' }}>
                  {asnData.map((data, i) => (
                    <div key={i} style={{ textAlign: 'center', width: '40px' }}>
                      <div style={{ 
                        height: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                      }}>
                        <div style={{ 
                          height: `${(data.wade / 300) * 100}%`,
                          background: '#ef4444',
                          borderRadius: '4px 4px 0 0',
                          marginBottom: data.jenny || data.guy ? 0 : '0.25rem'
                        }} />
                        {data.jenny > 0 && (
                          <div style={{ 
                            height: `${(data.jenny / 300) * 100}%`,
                            background: '#eab308',
                            marginBottom: data.guy ? 0 : '0.25rem'
                          }} />
                        )}
                        {data.guy > 0 && (
                          <div style={{ 
                            height: `${(data.guy / 300) * 100}%`,
                            background: '#22c55e',
                            marginBottom: '0.25rem'
                          }} />
                        )}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>{data.month}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates & Threat Exposures */}
            <div className="column is-one-third">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Certificates */}
                <div style={{ 
                  background: '#1a1d29',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #2d3748'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Certificates</h3>
                    <button style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '0.85rem' }}>View All →</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { status: 'Valid', count: 1, color: '#22c55e' },
                      { status: 'Expired', count: 0, color: '#ef4444' },
                      { status: 'Revoked', count: 0, color: '#dc2626' },
                      { status: 'Untrusted', count: 0, color: '#f59e0b' },
                      { status: 'Mismatched', count: 0, color: '#eab308' }
                    ].map((cert, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cert.color }} />
                          <span>{cert.status}</span>
                        </div>
                        <span style={{ color: '#6b7280' }}>{cert.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Threat Exposures Categories */}
                <div style={{ 
                  background: '#1a1d29',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #2d3748'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Threat Exposures Categories</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#2d3748" strokeWidth="12" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="157 314" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#eab308" strokeWidth="12" strokeDasharray="78.5 314" strokeDashoffset="-157" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="47 314" strokeDashoffset="-235.5" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#dc2626" strokeWidth="12" strokeDasharray="31.4 314" strokeDashoffset="-282.5" />
                      </svg>
                      <div style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>100</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total Threat</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                      <span>Vulnerabilities 50%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
                      <span>Certificates 25%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                      <span>Risk Ports 15%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }} />
                      <span>DNS 15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exposed Ports */}
          <div className="columns" style={{ marginTop: '1.5rem' }}>
            <div className="column">
              <div style={{ 
                background: '#1a1d29',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #2d3748'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Exposed Ports</h3>
                  <button style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '0.85rem' }}>View All →</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {exposedPorts.map((port, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ width: '60px', fontSize: '0.85rem' }}>{port.port}</span>
                      <div style={{ flex: 1, height: '24px', background: '#2d3748', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ 
                          width: `${port.percentage}%`,
                          height: '100%',
                          background: port.percentage === 100 ? '#22c55e' : port.percentage >= 65 ? '#3b82f6' : '#ef4444',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: '0.75rem'
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{port.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;