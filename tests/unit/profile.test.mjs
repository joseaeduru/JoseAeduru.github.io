import test from 'node:test';
import assert from 'node:assert/strict';
import * as profile from '../../src/data/profile.mjs';

const { site, stats, about, led, howIWork, skills, roles, certifications, education } = profile;

// Confirmed by Jose (handover note, 7 Oct 2026). Do not change without his say.
const FACTS = [
  ['Lead Oracle Cloud HCM Consultant', 'Pace Suburban Bus', 'Aug 2025 – Present', 'Remote'],
  ['Lead Oracle Cloud HCM Consultant', 'Fortive', 'Jun 2024 – Jul 2025', 'Remote / Texas'],
  ['Senior Oracle Cloud HCM Consultant', 'Deloitte USI', 'Nov 2019 – May 2024', 'Remote'],
  ['Oracle Cloud HCM Consultant', 'Tata Consultancy Services', 'Sep 2016 – Nov 2019', 'Hyderabad, India'],
  ['Senior Oracle Cloud HCM Techno-Functional Analyst', 'Satva Solutions', 'Jun 2015 – Sep 2016', 'Pune, India'],
  ['Oracle HCM Business Analyst', 'Growel Softech', 'Apr 2012 – Jun 2015', 'Pune, India'],
];

const roleText = (role) => [role.short, role.summary, ...role.bullets].join(' ');
const endedBefore = (role, month) => role.end !== null && role.end < month;

test('contact details are the approved ones', () => {
  assert.equal(site.name, 'Jose Aeduru');
  assert.equal(site.email, 'mailmejo9@gmail.com');
  assert.equal(site.linkedin, 'https://www.linkedin.com/in/jose1038');
  assert.equal(site.location, 'Frisco, TX (open to remote)');
});

test('description names the role, the place and both product names', () => {
  assert.match(site.description, /Lead Oracle Cloud HCM/);
  assert.match(site.description, /Oracle Fusion HCM/);
  assert.match(site.description, /Frisco, TX/);
});

test('roles match the confirmed facts, newest first', () => {
  assert.deepEqual(
    roles.map((r) => [r.title, r.employer, r.dates, r.location]),
    FACTS,
  );
});

test('only the first role is current, and role ids are unique', () => {
  assert.equal(roles[0].end, null);
  assert.ok(roles.slice(1).every((r) => typeof r.end === 'string'));
  assert.equal(new Set(roles.map((r) => r.id)).size, roles.length);
});

test('every role has a one-liner, a summary and bullets', () => {
  for (const role of roles) {
    assert.ok(role.short.length > 20, role.id);
    assert.ok(role.summary.length > 20, role.id);
    assert.ok(role.bullets.length >= 3, role.id);
  }
});

test('date-fit: no OIC in roles that ended before Nov 2017', () => {
  for (const role of roles.filter((r) => endedBefore(r, '2017-11'))) {
    assert.doesNotMatch(roleText(role), /\bOIC\b/, role.id);
  }
});

test('date-fit: no VBCS or Visual Builder in roles that ended before Aug 2017', () => {
  for (const role of roles.filter((r) => endedBefore(r, '2017-08'))) {
    assert.doesNotMatch(roleText(role), /\bVBCS\b|Visual Builder/, role.id);
  }
});

test('date-fit: no Redwood in roles that ended before 2019', () => {
  for (const role of roles.filter((r) => endedBefore(r, '2019-01'))) {
    assert.doesNotMatch(roleText(role), /Redwood/, role.id);
  }
});

test('date-fit: no HDL at Growel and no ORC at Satva', () => {
  assert.doesNotMatch(roleText(roles.find((r) => r.id === 'growel')), /\bHDL\b|Data Loader/);
  assert.doesNotMatch(roleText(roles.find((r) => r.id === 'satva')), /\bORC\b/);
});

test('in-progress work is worded as in progress', () => {
  const pace = roleText(roles.find((r) => r.id === 'pace'));
  assert.match(pace, /Building an Oracle AI pilot/);
  assert.match(pace, /with HR for testing/);
  assert.match(pace, /in progress/);
});

test('three certifications, education without dates', () => {
  assert.deepEqual(certifications, [
    'Oracle Global Human Resources Cloud Implementation Professional',
    'Oracle Talent Management Cloud Implementation Professional',
    'Oracle Benefits Cloud Implementation Professional',
  ]);
  assert.match(education, /Jawaharlal Nehru Technological University \(JNTUH\), India/);
  assert.doesNotMatch(education, /\d{4}/);
});

test('home sections have the agreed sizes', () => {
  assert.equal(stats.length, 3);
  assert.equal(about.length, 2);
  assert.equal(led.length, 5);
  assert.equal(howIWork.length, 3);
  assert.equal(skills.length, 5);
});

test('no em dashes and no phone numbers anywhere in the data', () => {
  const all = JSON.stringify({ ...profile });
  assert.doesNotMatch(all, /—/);
  assert.doesNotMatch(all, /\d{3}[ .-]\d{3}[ .-]\d{4}/);
});

test('Job Application AI Overview is marked as in validation wherever it is named', () => {
  const pills = skills.flatMap((group) => group.items).filter((item) => item.includes('Job Application AI Overview'));
  assert.deepEqual(pills, ['Job Application AI Overview (in validation)']);
});

test('the availability line is data, so it has one place to change or remove', () => {
  assert.equal(typeof site.availability, 'string');
  assert.match(site.availability, /Oracle Cloud HCM roles/);
});
