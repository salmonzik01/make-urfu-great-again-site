import './style.css'

const programs = import.meta.glob('./programs/*.json');
const programsNames = Object.keys(programs).map(v => v.split('/')[v.length-1]);

const app = document.querySelector<HTMLDivElement>('#app')!;
const select = document.createElement('select')
select.id = "chooseProgram";
select.title = "Choose program"
app.appendChild(select)

for (let programName of programsNames) {
  select.innerHTML += `<option value="${programName}">${programName?.split('.')[0]}</option>`
}

const table = document.createElement('table')
app.append(table);


select.addEventListener('change', async (_e) => {
  table.innerHTML = `
  <tr>
    <td>Номер</td>
    <td>СНИЛС</td>
    <td>Бал ЕГЭ</td>
    <td>Оригиналы?</td>
    <td>Приоритет</td>
    <td>Статус</td>
    <td>Компетенция</td>
    <td>Компенсация</td>
  <tr>
`

  const program = await import(/* @vite-ignore */`./programs/${select.value}`);
  const entrants = program.default.sort((a: any, b: any) => b.total_mark - a.total_mark);
  // console.log("entratns", entrants)

  for (let entrant of entrants) {
    table.innerHTML += `
      <tr>
        <td>${entrant.regnum}</td>
        <td>${entrant.snils}</td>
        <td>${entrant.total_mark}</td>
        <td>${entrant.original}</td>
        <td>${entrant.priority}</td>
        <td>${entrant.status}</td>
        <td>${entrant.competition}</td>
        <td>${entrant.compensation}</td>
      <tr>
    `
  }
});

// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
