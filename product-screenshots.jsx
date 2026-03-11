import React, { useState } from 'react';

const ProductScreenshots = () => {
  const [hoveredRFIId, setHoveredRFIId] = useState(null);

  const designTokens = {
    bg: {
      abyss: '#05060A',
      deep: '#08090E',
      mid: '#0D1117',
      raised: '#161B22',
      shelf: '#1C2128',
    },
    glass: {
      light: 'rgba(255,255,255,0.03)',
      md: 'rgba(255,255,255,0.05)',
      semi: 'rgba(255,255,255,0.08)',
      bright: 'rgba(255,255,255,0.12)',
    },
    border: {
      light: 'rgba(255,255,255,0.04)',
      md: 'rgba(255,255,255,0.06)',
      semi: 'rgba(255,255,255,0.08)',
      bright: 'rgba(255,255,255,0.12)',
    },
    text: {
      lit: '#E8E0D4',
      mid: '#8B8578',
      shadow: '#4A4A52',
    },
    accent: {
      gold: '#F0E6D3',
    },
    status: {
      green: '#2DD4A8',
      amber: '#F5A623',
      red: '#E84855',
      blue: '#4C8BF5',
      purple: '#8B5CF6',
    },
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: ${designTokens.bg.abyss};
      color: ${designTokens.text.lit};
      font-family: 'DM Sans', sans-serif;
    }

    .screenshots-container {
      background: linear-gradient(180deg, ${designTokens.bg.abyss} 0%, ${designTokens.bg.deep} 100%);
      min-height: 100vh;
      padding: 60px 40px;
    }

    .title-section {
      max-width: 1400px;
      margin: 0 auto 80px;
      text-align: center;
    }

    .title-section h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      background: linear-gradient(135deg, ${designTokens.text.lit}, ${designTokens.accent.gold});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title-section p {
      font-size: 18px;
      color: ${designTokens.text.mid};
      max-width: 600px;
      margin: 0 auto;
    }

    .screenshot-section {
      max-width: 1400px;
      margin: 0 auto 100px;
    }

    .screenshot-label {
      font-size: 14px;
      font-weight: 600;
      color: ${designTokens.accent.gold};
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .browser-chrome {
      background: ${designTokens.bg.raised};
      border: 1px solid ${designTokens.border.semi};
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }

    .chrome-header {
      background: ${designTokens.bg.shelf};
      border-bottom: 1px solid ${designTokens.border.light};
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chrome-dots {
      display: flex;
      gap: 6px;
    }

    .chrome-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .chrome-dot-close {
      background: ${designTokens.status.red};
    }

    .chrome-dot-min {
      background: ${designTokens.status.amber};
    }

    .chrome-dot-max {
      background: ${designTokens.status.green};
    }

    .chrome-url {
      flex: 1;
      margin-left: 12px;
      font-size: 12px;
      color: ${designTokens.text.mid};
      font-family: 'JetBrains Mono', monospace;
    }

    .screenshot-content {
      background: ${designTokens.bg.mid};
      width: 100%;
      min-height: 750px;
      position: relative;
      overflow: hidden;
    }

    /* Screenshot 1: Gantt View */
    .gantt-container {
      display: flex;
      height: 100%;
      background: ${designTokens.bg.mid};
    }

    .gantt-header {
      grid-column: 1 / -1;
      padding: 24px;
      background: linear-gradient(180deg, ${designTokens.bg.raised}, transparent);
      border-bottom: 1px solid ${designTokens.border.semi};
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .stat-card {
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      border-radius: 8px;
      padding: 16px;
      backdrop-filter: blur(8px);
    }

    .stat-card-label {
      font-size: 12px;
      color: ${designTokens.text.shadow};
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-card-value {
      font-size: 28px;
      font-weight: 700;
      color: ${designTokens.text.lit};
    }

    .stat-card-subtext {
      font-size: 12px;
      margin-top: 6px;
      color: ${designTokens.text.mid};
    }

    .stat-card.positive .stat-card-subtext {
      color: ${designTokens.status.green};
    }

    .stat-card.negative .stat-card-subtext {
      color: ${designTokens.status.red};
    }

    .gantt-body {
      display: flex;
      overflow-x: auto;
      overflow-y: auto;
      flex: 1;
    }

    .task-list {
      width: 320px;
      flex-shrink: 0;
      border-right: 1px solid ${designTokens.border.semi};
      background: ${designTokens.bg.raised};
      overflow-y: auto;
    }

    .task-header {
      position: sticky;
      top: 0;
      display: grid;
      grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
      gap: 12px;
      padding: 12px 16px;
      background: ${designTokens.bg.shelf};
      border-bottom: 1px solid ${designTokens.border.semi};
      font-size: 11px;
      font-weight: 600;
      color: ${designTokens.text.shadow};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .task-row {
      display: grid;
      grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid ${designTokens.border.light};
      font-size: 12px;
      color: ${designTokens.text.lit};
      align-items: center;
      background: transparent;
      transition: background 0.2s ease;
    }

    .task-row:hover {
      background: ${designTokens.glass.light};
    }

    .task-name {
      font-weight: 500;
    }

    .task-discipline {
      color: ${designTokens.text.mid};
      font-size: 11px;
    }

    .gantt-chart {
      flex: 1;
      background: linear-gradient(to right, transparent 0%, transparent 100%);
      padding: 12px 24px;
      overflow-x: auto;
      position: relative;
    }

    .gantt-months {
      display: flex;
      gap: 100px;
      margin-bottom: 20px;
      font-size: 13px;
      font-weight: 600;
      color: ${designTokens.text.shadow};
      position: relative;
      z-index: 1;
    }

    .gantt-row-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      position: relative;
      gap: 12px;
    }

    .gantt-bar-container {
      flex: 1;
      height: 28px;
      background: ${designTokens.glass.light};
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      border: 1px solid ${designTokens.border.light};
    }

    .gantt-bar {
      height: 100%;
      border-radius: 3px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-size: 10px;
      font-weight: 600;
      color: white;
      overflow: hidden;
    }

    .gantt-bar.in-progress {
      background: linear-gradient(90deg, ${designTokens.status.blue}, ${designTokens.status.blue}cc);
      box-shadow: 0 0 12px rgba(76, 139, 245, 0.3);
    }

    .gantt-bar.complete {
      background: linear-gradient(90deg, ${designTokens.status.green}, ${designTokens.status.green}cc);
    }

    .gantt-bar.at-risk {
      background: linear-gradient(90deg, ${designTokens.status.amber}, ${designTokens.status.amber}cc);
    }

    .gantt-bar.blocked {
      background: linear-gradient(90deg, ${designTokens.status.red}, ${designTokens.status.red}cc);
    }

    .gantt-bar-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: rgba(255,255,255,0.2);
      border-radius: 3px;
    }

    .gantt-today-line {
      position: absolute;
      width: 2px;
      height: calc(100% - 60px);
      background: ${designTokens.status.red};
      top: 40px;
      left: 380px;
      box-shadow: 0 0 8px rgba(232, 72, 85, 0.5);
    }

    /* Screenshot 2: Dashboard */
    .dashboard-container {
      padding: 32px;
      background: ${designTokens.bg.mid};
    }

    .dashboard-header {
      margin-bottom: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-title {
      font-size: 28px;
      font-weight: 700;
      color: ${designTokens.text.lit};
    }

    .status-badge {
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: ${designTokens.status.green};
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${designTokens.status.green};
      box-shadow: 0 0 6px rgba(45, 212, 168, 0.5);
    }

    .stat-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card-large {
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      border-radius: 10px;
      padding: 20px;
      backdrop-filter: blur(8px);
    }

    .stat-card-large-label {
      font-size: 13px;
      color: ${designTokens.text.shadow};
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .stat-card-large-main {
      font-size: 32px;
      font-weight: 700;
      color: ${designTokens.text.lit};
      margin-bottom: 8px;
    }

    .stat-card-large-sub {
      font-size: 13px;
      color: ${designTokens.text.mid};
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: ${designTokens.glass.light};
      border-radius: 3px;
      overflow: hidden;
      margin-top: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, ${designTokens.status.green}, ${designTokens.status.green}99);
      border-radius: 3px;
    }

    .dashboard-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .activity-section {
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      border-radius: 10px;
      padding: 20px;
      backdrop-filter: blur(8px);
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: ${designTokens.text.lit};
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .activity-item {
      display: flex;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid ${designTokens.border.light};
      font-size: 12px;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
    }

    .activity-content {
      flex: 1;
    }

    .activity-message {
      color: ${designTokens.text.lit};
      margin-bottom: 4px;
    }

    .activity-time {
      color: ${designTokens.text.shadow};
      font-size: 11px;
    }

    .milestone-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid ${designTokens.border.light};
      font-size: 12px;
    }

    .milestone-item:last-child {
      border-bottom: none;
    }

    .milestone-name {
      color: ${designTokens.text.lit};
      font-weight: 500;
    }

    .milestone-date {
      color: ${designTokens.text.shadow};
      font-size: 11px;
    }

    /* Screenshot 3: Pursuit Pipeline */
    .pipeline-container {
      padding: 24px;
      background: ${designTokens.bg.mid};
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .pipeline-header {
      margin-bottom: 24px;
      padding: 16px;
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      font-size: 13px;
    }

    .pipeline-stat {
      flex: 1;
    }

    .pipeline-stat-label {
      color: ${designTokens.text.shadow};
      font-size: 11px;
      margin-bottom: 6px;
    }

    .pipeline-stat-value {
      color: ${designTokens.text.lit};
      font-weight: 700;
      font-size: 20px;
    }

    .kanban-board {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      flex: 1;
    }

    .kanban-column {
      flex: 0 0 280px;
      display: flex;
      flex-direction: column;
      background: ${designTokens.glass.light};
      border: 1px solid ${designTokens.border.light};
      border-radius: 8px;
      padding: 16px;
    }

    .kanban-column-title {
      font-size: 13px;
      font-weight: 600;
      color: ${designTokens.text.lit};
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid ${designTokens.border.md};
    }

    .kanban-card {
      background: ${designTokens.glass.md};
      border: 1px solid ${designTokens.border.semi};
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 12px;
      border-top: 3px solid;
      font-size: 12px;
    }

    .kanban-card:hover {
      background: ${designTokens.glass.semi};
    }

    .kanban-card-title {
      font-weight: 600;
      color: ${designTokens.text.lit};
      margin-bottom: 8px;
    }

    .kanban-card-client {
      color: ${designTokens.text.mid};
      font-size: 11px;
      margin-bottom: 8px;
    }

    .kanban-card-value {
      color: ${designTokens.accent.gold};
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 8px;
    }

    .kanban-card-due {
      color: ${designTokens.text.shadow};
      font-size: 11px;
    }

    /* Screenshot 4: RFI Tracker */
    .rfi-container {
      padding: 24px;
      background: ${designTokens.bg.mid};
    }

    .rfi-filter-bar {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      align-items: center;
    }

    .search-input {
      flex: 1;
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      border-radius: 6px;
      padding: 10px 14px;
      color: ${designTokens.text.lit};
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
    }

    .search-input::placeholder {
      color: ${designTokens.text.shadow};
    }

    .filter-pill {
      background: ${designTokens.glass.semi};
      border: 1px solid ${designTokens.border.md};
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 12px;
      color: ${designTokens.text.mid};
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-pill:hover {
      background: ${designTokens.glass.bright};
      color: ${designTokens.text.lit};
    }

    .rfi-table {
      width: 100%;
      border-collapse: collapse;
    }

    .rfi-table-header {
      display: grid;
      grid-template-columns: 80px 1fr 120px 90px 140px 100px 100px;
      gap: 16px;
      padding: 12px 16px;
      background: ${designTokens.bg.raised};
      border: 1px solid ${designTokens.border.semi};
      border-radius: 6px 6px 0 0;
      font-size: 11px;
      font-weight: 600;
      color: ${designTokens.text.shadow};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rfi-table-body {
      border-left: 1px solid ${designTokens.border.semi};
      border-right: 1px solid ${designTokens.border.semi};
      border-bottom: 1px solid ${designTokens.border.semi};
      border-radius: 0 0 6px 6px;
      overflow: hidden;
    }

    .rfi-row {
      display: grid;
      grid-template-columns: 80px 1fr 120px 90px 140px 100px 100px;
      gap: 16px;
      padding: 14px 16px;
      border-bottom: 1px solid ${designTokens.border.light};
      align-items: center;
      transition: background 0.2s ease;
      background: transparent;
    }

    .rfi-row:hover {
      background: ${designTokens.glass.light};
    }

    .rfi-id {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 600;
      color: ${designTokens.accent.gold};
    }

    .rfi-subject {
      font-size: 13px;
      color: ${designTokens.text.lit};
      font-weight: 500;
    }

    .status-pill {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      width: fit-content;
    }

    .status-pill.submitted {
      background: rgba(76, 139, 245, 0.2);
      color: ${designTokens.status.blue};
      border: 1px solid rgba(76, 139, 245, 0.4);
    }

    .status-pill.under-review {
      background: rgba(245, 166, 35, 0.2);
      color: ${designTokens.status.amber};
      border: 1px solid rgba(245, 166, 35, 0.4);
    }

    .status-pill.responded {
      background: rgba(45, 212, 168, 0.2);
      color: ${designTokens.status.green};
      border: 1px solid rgba(45, 212, 168, 0.4);
    }

    .status-pill.critical {
      background: rgba(232, 72, 85, 0.2);
      color: ${designTokens.status.red};
      border: 1px solid rgba(232, 72, 85, 0.4);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(232, 72, 85, 0.4);
      }
      50% {
        box-shadow: 0 0 0 4px rgba(232, 72, 85, 0.1);
      }
    }

    .priority-high {
      color: ${designTokens.status.red};
      font-weight: 600;
    }

    .priority-medium {
      color: ${designTokens.status.amber};
      font-weight: 600;
    }

    .priority-low {
      color: ${designTokens.status.green};
      font-weight: 600;
    }

    .rfi-assigned {
      font-size: 12px;
      color: ${designTokens.text.mid};
    }

    .rfi-due {
      font-size: 12px;
      color: ${designTokens.text.mid};
    }

    .rfi-days {
      font-size: 12px;
      color: ${designTokens.text.mid};
    }

    .scrollable-area {
      overflow-y: auto;
      max-height: 750px;
    }
  `;

  const ganttTasks = [
    { name: 'Stand Beams — Cycle 3', discipline: 'Structural', status: 'complete', width: '85%', position: '0%' },
    { name: 'Install Temp Anchors', discipline: 'Structural', status: 'complete', width: '78%', position: '15%' },
    { name: 'Pull Exterior Panels', discipline: 'Envelope', status: 'in-progress', width: '45%', position: '32%' },
    { name: 'Begin Insulation', discipline: 'Envelope', status: 'in-progress', width: '38%', position: '48%' },
    { name: 'Tape Insulation Seams', discipline: 'Envelope', status: 'at-risk', width: '15%', position: '62%' },
    { name: 'Install Interior Liners', discipline: 'Interior', status: 'at-risk', width: '0%', position: '75%' },
    { name: 'Face Panel Installation', discipline: 'Interior', status: 'blocked', width: '0%', position: '85%' },
    { name: 'Final Tensioning', discipline: 'Final', status: 'blocked', width: '0%', position: '92%' },
  ];

  const dashboardActivities = [
    { message: 'Schedule Variance increased to -2 days', time: '2 hours ago', color: designTokens.status.green },
    { message: 'RFI #428 responded — HVAC routing', time: '4 hours ago', color: designTokens.status.green },
    { message: 'Submittal rejected — Structural drawings', time: '1 day ago', color: designTokens.status.red },
    { message: 'Milestone — Envelope complete reached', time: '3 days ago', color: designTokens.status.green },
    { message: 'Change Order #7 approved — $18,500', time: '5 days ago', color: designTokens.status.blue },
  ];

  const milestones = [
    { name: 'Structural completion', date: 'Mar 15, 2026', progress: 92 },
    { name: 'Envelope closure', date: 'Apr 2, 2026', progress: 68 },
    { name: 'Interior rough-in', date: 'May 8, 2026', progress: 0 },
    { name: 'Substantial completion', date: 'Jul 1, 2026', progress: 0 },
  ];

  const pursuitProjects = [
    { stage: 'Identified', projects: [
      { name: 'Erbil Logistics Hub', client: 'Ministry of Transport', value: '$4.2M', dueDate: 'Apr 30' },
      { name: 'Camp Arifjan Renovation', client: 'US Military', value: '$1.8M', dueDate: 'May 15' },
    ]},
    { stage: 'Evaluating', projects: [
      { name: 'Bagram Maintenance Facility', client: 'US Military', value: '$6.5M', dueDate: 'Jun 1' },
      { name: 'Baghdad Water Treatment', client: 'Govt. Contract', value: '$2.1M', dueDate: 'Jun 15' },
    ]},
    { stage: 'Go', projects: [
      { name: 'Tikrit Power Station Upgrade', client: 'Iraqi Power Authority', value: '$8.3M', dueDate: 'Jul 1' },
    ]},
    { stage: 'Proposal In Progress', projects: [
      { name: 'Najaf Hospital Expansion', client: 'Ministry of Health', value: '$5.6M', dueDate: 'Apr 20' },
      { name: 'Basra Port Development', client: 'Port Authority', value: '$12.1M', dueDate: 'May 30' },
    ]},
    { stage: 'Submitted', projects: [
      { name: 'Kurdistan Regional Prison', client: 'KRG', value: '$3.4M', dueDate: 'Mar 25' },
    ]},
  ];

  const rfiData = [
    { id: 'RFI-428', subject: 'Foundation rebar spacing clarification — Level 1', status: 'responded', priority: 'High', assigned: 'Sarah Chen', due: 'Mar 20', daysOpen: 8 },
    { id: 'RFI-429', subject: 'HVAC duct routing conflict at Level 3', status: 'under-review', priority: 'Critical', assigned: 'John Smith', due: 'Mar 18', daysOpen: 12 },
    { id: 'RFI-430', subject: 'Structural steel connection detail revision', status: 'submitted', priority: 'High', assigned: 'Maria Garcia', due: 'Mar 22', daysOpen: 3 },
    { id: 'RFI-431', subject: 'Exterior panel color sample approval', status: 'responded', priority: 'Medium', assigned: 'David Park', due: 'Mar 25', daysOpen: 5 },
    { id: 'RFI-432', subject: 'Fire barrier installation specification', status: 'critical', priority: 'Critical', assigned: 'Sarah Chen', due: 'Mar 16', daysOpen: 15 },
    { id: 'RFI-433', subject: 'Electrical conduit routing in slab', status: 'under-review', priority: 'Medium', assigned: 'Mike Johnson', due: 'Mar 28', daysOpen: 1 },
  ];

  const getPriorityClass = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'critical': return 'priority-high';
      case 'medium': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  return (
    <div className="screenshots-container">
      <style>{styles}</style>

      <div className="title-section">
        <h1>BuildLens Product Screenshots</h1>
        <p>Comprehensive project management, scheduling, and execution tracking for construction enterprises</p>
      </div>

      {/* Screenshot 1: Schedule & Gantt View */}
      <div className="screenshot-section">
        <div className="screenshot-label">Screenshot 1: Schedule & Gantt View</div>
        <div className="browser-chrome">
          <div className="chrome-header">
            <div className="chrome-dots">
              <div className="chrome-dot chrome-dot-close"></div>
              <div className="chrome-dot chrome-dot-min"></div>
              <div className="chrome-dot chrome-dot-max"></div>
            </div>
            <div className="chrome-url">https://app.buildlens.com/project/baghdad-phase2/schedule</div>
          </div>
          <div className="screenshot-content scrollable-area">
            <div className="gantt-header">
              <div className="stat-card">
                <div className="stat-card-label">Milestones</div>
                <div className="stat-card-value">8/12</div>
              </div>
              <div className="stat-card positive">
                <div className="stat-card-label">Schedule Variance</div>
                <div className="stat-card-value">-2 days</div>
                <div className="stat-card-subtext">✓ Ahead of schedule</div>
              </div>
              <div className="stat-card negative">
                <div className="stat-card-label">Blocked Activities</div>
                <div className="stat-card-value">1</div>
                <div className="stat-card-subtext">Requires attention</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-label">Float Remaining</div>
                <div className="stat-card-value">6 days</div>
              </div>
            </div>
            <div className="gantt-body">
              <div className="task-list">
                <div className="task-header">
                  <div>Task</div>
                  <div>Discipline</div>
                  <div>Start</div>
                  <div>End</div>
                  <div>%</div>
                </div>
                {ganttTasks.map((task, idx) => (
                  <div key={idx} className="task-row">
                    <div className="task-name">{task.name}</div>
                    <div className="task-discipline">{task.discipline}</div>
                    <div className="task-discipline">Feb {15 + idx}</div>
                    <div className="task-discipline">Mar {5 + idx}</div>
                    <div className="task-discipline">{Math.floor(Math.random() * 100)}</div>
                  </div>
                ))}
              </div>
              <div className="gantt-chart">
                <div className="gantt-months">
                  <div>February</div>
                  <div>March</div>
                  <div>April</div>
                </div>
                {ganttTasks.map((task, idx) => (
                  <div key={idx} className="gantt-row-item">
                    <div className="gantt-bar-container">
                      <div className={`gantt-bar ${task.status}`} style={{
                        width: task.width,
                        marginLeft: task.position,
                      }}>
                        <div className="gantt-bar-fill" style={{
                          width: `${Math.floor(Math.random() * 80) + 20}%`
                        }}></div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="gantt-today-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot 2: Project Dashboard */}
      <div className="screenshot-section">
        <div className="screenshot-label">Screenshot 2: Project Dashboard</div>
        <div className="browser-chrome">
          <div className="chrome-header">
            <div className="chrome-dots">
              <div className="chrome-dot chrome-dot-close"></div>
              <div className="chrome-dot chrome-dot-min"></div>
              <div className="chrome-dot chrome-dot-max"></div>
            </div>
            <div className="chrome-url">https://app.buildlens.com/project/baghdad-phase2/dashboard</div>
          </div>
          <div className="screenshot-content scrollable-area">
            <div className="dashboard-container">
              <div className="dashboard-header">
                <div>
                  <div className="project-title">Baghdad Training Facility — Phase 2</div>
                </div>
                <div className="status-badge">
                  <div className="status-dot"></div>
                  On Track
                </div>
              </div>

              <div className="stat-cards-grid">
                <div className="stat-card-large">
                  <div className="stat-card-large-label">Budget</div>
                  <div className="stat-card-large-main">$2.4M</div>
                  <div className="stat-card-large-sub">of $3.1M allocated</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '77%' }}></div>
                  </div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-card-large-label">Schedule</div>
                  <div className="stat-card-large-main">68%</div>
                  <div className="stat-card-large-sub">Project completion</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-card-large-label">RFIs</div>
                  <div className="stat-card-large-main">12</div>
                  <div className="stat-card-large-sub">3 critical, 9 standard</div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-card-large-label">Submittals</div>
                  <div className="stat-card-large-main">24</div>
                  <div className="stat-card-large-sub">6 pending approval</div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-card-large-label">Inspections</div>
                  <div className="stat-card-large-main">8</div>
                  <div className="stat-card-large-sub">2 upcoming this week</div>
                </div>
                <div className="stat-card-large">
                  <div className="stat-card-large-label">Change Orders</div>
                  <div className="stat-card-large-main">3</div>
                  <div className="stat-card-large-sub">Total: $142,500</div>
                </div>
              </div>

              <div className="dashboard-body">
                <div className="activity-section">
                  <div className="section-title">Recent Activity</div>
                  {dashboardActivities.map((activity, idx) => (
                    <div key={idx} className="activity-item">
                      <div className="activity-dot" style={{ background: activity.color }}></div>
                      <div className="activity-content">
                        <div className="activity-message">{activity.message}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="activity-section">
                  <div className="section-title">Upcoming Milestones</div>
                  {milestones.map((milestone, idx) => (
                    <div key={idx} className="milestone-item">
                      <div style={{ flex: 1 }}>
                        <div className="milestone-name">{milestone.name}</div>
                        <div className="progress-bar" style={{ marginTop: '6px' }}>
                          <div className="progress-fill" style={{ width: `${milestone.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="milestone-date">{milestone.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot 3: Pursuit Pipeline Board */}
      <div className="screenshot-section">
        <div className="screenshot-label">Screenshot 3: Pursuit Pipeline Board</div>
        <div className="browser-chrome">
          <div className="chrome-header">
            <div className="chrome-dots">
              <div className="chrome-dot chrome-dot-close"></div>
              <div className="chrome-dot chrome-dot-min"></div>
              <div className="chrome-dot chrome-dot-max"></div>
            </div>
            <div className="chrome-url">https://app.buildlens.com/pursuits/pipeline</div>
          </div>
          <div className="screenshot-content scrollable-area">
            <div className="pipeline-container">
              <div className="pipeline-header">
                <div className="pipeline-stat">
                  <div className="pipeline-stat-label">Pipeline Value</div>
                  <div className="pipeline-stat-value">$18.7M</div>
                </div>
                <div className="pipeline-stat">
                  <div className="pipeline-stat-label">Active Pursuits</div>
                  <div className="pipeline-stat-value">11</div>
                </div>
                <div className="pipeline-stat">
                  <div className="pipeline-stat-label">Win Rate</div>
                  <div className="pipeline-stat-value">67%</div>
                </div>
              </div>

              <div className="kanban-board">
                {pursuitProjects.map((column, colIdx) => (
                  <div key={colIdx} className="kanban-column">
                    <div className="kanban-column-title">{column.stage}</div>
                    {column.projects.map((project, projIdx) => {
                      const statusColors = {
                        'Identified': designTokens.status.amber,
                        'Evaluating': designTokens.status.blue,
                        'Go': designTokens.status.green,
                        'Proposal In Progress': designTokens.status.purple,
                        'Submitted': designTokens.status.blue,
                      };
                      return (
                        <div key={projIdx} className="kanban-card" style={{ borderTopColor: statusColors[column.stage] }}>
                          <div className="kanban-card-title">{project.name}</div>
                          <div className="kanban-card-client">{project.client}</div>
                          <div className="kanban-card-value">{project.value}</div>
                          <div className="kanban-card-due">Due: {project.dueDate}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot 4: RFI & Submittal Tracker */}
      <div className="screenshot-section">
        <div className="screenshot-label">Screenshot 4: RFI & Submittal Tracker</div>
        <div className="browser-chrome">
          <div className="chrome-header">
            <div className="chrome-dots">
              <div className="chrome-dot chrome-dot-close"></div>
              <div className="chrome-dot chrome-dot-min"></div>
              <div className="chrome-dot chrome-dot-max"></div>
            </div>
            <div className="chrome-url">https://app.buildlens.com/project/baghdad-phase2/rfi</div>
          </div>
          <div className="screenshot-content scrollable-area">
            <div className="rfi-container">
              <div className="rfi-filter-bar">
                <input type="text" className="search-input" placeholder="Search RFIs..." />
                <div className="filter-pill">All Statuses</div>
                <div className="filter-pill">My Assignments</div>
                <div className="filter-pill">Critical Only</div>
              </div>

              <div className="rfi-table">
                <div className="rfi-table-header">
                  <div>ID</div>
                  <div>Subject</div>
                  <div>Status</div>
                  <div>Priority</div>
                  <div>Assigned To</div>
                  <div>Due Date</div>
                  <div>Days Open</div>
                </div>
                <div className="rfi-table-body">
                  {rfiData.map((rfi, idx) => (
                    <div
                      key={idx}
                      className="rfi-row"
                      onMouseEnter={() => setHoveredRFIId(idx)}
                      onMouseLeave={() => setHoveredRFIId(null)}
                    >
                      <div className="rfi-id">{rfi.id}</div>
                      <div className="rfi-subject">{rfi.subject}</div>
                      <div className={`status-pill ${rfi.status}`}>{rfi.status}</div>
                      <div className={getPriorityClass(rfi.priority)}>{rfi.priority}</div>
                      <div className="rfi-assigned">{rfi.assigned}</div>
                      <div className="rfi-due">{rfi.due}</div>
                      <div className="rfi-days">{rfi.daysOpen}d</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreenshots;
