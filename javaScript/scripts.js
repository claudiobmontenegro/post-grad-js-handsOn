// studentModal.open = true // funciona para abrir o dialog
// studentModal.open = false// funciona para fechar o dialog
// studentModal.setAttribute('open', true) // funciona para abrir o dialog
// studentModal.setAttribute('open', false) // não funciona para fechar o dialog
// studentModal.removeAttribute('open') funciona para fechar o dialog
// studentModal.showModal() // funciona para abrir o dialog
// studentModal.close() funciona para fechar o dialog

const studentModal = document.querySelector('#student-modal');
const studentForm = document.querySelector('#student-form');
const studentModalTitle = document.querySelector('#student-modal-title')
const saveStudentButton = document.querySelector('#save-student')

const disciplineModal = document.querySelector('#discipline-modal');
const disciplineForm = document.querySelector('#discipline-form');
const disciplineModalTitle = document.querySelector('#discipline-modal-title')
const saveDisciplineButton = document.querySelector('#save-discipline')

/**
 * Função responsável abrir o modal de estudante
 */
const openStudentModal = () => studentModal.showModal();
const openDisciplineModal = () => disciplineModal.showModal();

/**
 * Função responsável fechar o modal de estudante
 */
const closeStudentModal = () => studentModal.close();
const closeDisciplineModal = () => disciplineModal.close();

/**
 * Função responsável por criar linhas na tabela student-table
 * @param {nome} string
 * @param {matricula} string
 * @param {curso} string
 * @param {id} string
 */
const createStudentTableRow = (nome, matricula, curso, id) => {
  const studentTable = document.querySelector('#student-table tbody')
  const tableTr = document.createElement('tr');
  tableTr.innerHTML = ` 
  <td>${nome}</td>
  <td>${matricula}</td>
  <td>${curso}</td>
  <td align="center">
    <button class="button button--danger" onclick=deleteStudentTable(${id})>Apagar</button>
    <button class="button button--success" onclick="editdStudentModal(${id})">Editar</button>
  </td>`;
  studentTable.appendChild(tableTr);
}

/**
 * Função responsável savar os dados de um estudante
 * @param {url} string
 * @param {method} string
 */
const saveStundentData = (url, method) => {
  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
      }).then(response => {
        console.log(response)
        if(response.ok){
          closeStudentModal();
          document.location.reload();
        }
      })
      .catch(error => {
        closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
      })
    // const inputs = document.querySelectorAll('input') // pega todos os iputs
    // console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  });
}

/**
 * Função responsável abrir o modal de aluno e salvar um novo aluno
 * @param {studentId} string
 */
const createStudent = () => {
  openStudentModal();
  studentModalTitle.textContent = 'Novo Aluno';
  saveStudentButton.textContent = 'Criar';
  saveStundentData('http://localhost:3000/alunos', 'POST');
}

/**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {studentId} string
 */
const editdStudentModal = async (studentId) => {
  const url = `http://localhost:3000/alunos/${studentId}`;
  openStudentModal();
  studentModalTitle.textContent = 'Editar aluno';
  saveStudentButton.textContent = 'Editar';
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso = document.querySelector("#curso");
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      name.value = data.nome
      matricula.value = data.matricula
      selectCurso.value = data.curso
    })
  saveStundentData(url, 'PUT');
};

/**
 * Função responsável por apagar dados de um estutande
 * @param {studentId} string
 */
const deleteStudentTable = async (studentId) => {
  fetch(`http://localhost:3000/alunos/${studentId}`, {
    method: 'DELETE'
  }).then(document.location.reload());  
}


/**
 * Função responsável por carregar os dados da student-table
 */
const loadStudentTable = () => {
  fetch('http://localhost:3000/alunos')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(item => {
        createStudentTableRow(item.nome, item.matricula, item.curso, item.id)
      })
    }).catch((error) => {
      alert('ocorreu um erro tente mais tarde')
      console.error(error);
    });
};

/**
 * @param {id} string
 * @param {nome} string
 * @param {cargaHoraria} string
 * @param {professor} string
 * @param {status} string
 * @param {observacos} string
 */
const createDisciplineTableRow = (nome, cargaHoraria, professor, status, observacos, id) => {
  const disciplineTable = document.querySelector('#subject-list')
  const card = document.createElement('div');
  const statusCard = status === 'Obrigatória' ? 'tag tag--danger' : 'tag tag--success';
  card.innerHTML = ` 
  <div class="subject-card">
  <h3 class="subject-card__title">${nome}</h3>
  <hr />
  <ul class="subject-card__list">
    <li>Carga Horaria: ${cargaHoraria}</li>
    <li>Professor: ${professor}</li>
    <li>Status <span class="${statusCard}">${status}</span></li>    
  </ul>
  <p>${observacos}</p>  
  <br>
  <button class="button button--danger" onclick=deleteDiscipline(${id})>Apagar</button>
  <button class="button button--success" onclick="editDiscipline(${id})">Editar</button>  
</div>
`;
  disciplineTable.appendChild(card);
};

const loadDisciplineTable = () => {
  fetch('http://localhost:3000/disciplinas')
    .then(resp => resp.json())
    .then(data => {
      data.forEach(item => {
        createDisciplineTableRow(item.nome, item.cargaHoraria, item.professor, item.status, item.observacos, item.id)
      })
    }).catch((error) => {
      alert('ocorreu um erro tente mais tarde')
      console.error(error);
    });
};

const saveDisciplineData = (url, method) => {
  disciplineForm.addEventListener('submit', (event) => {
    event.preventDefault();    
    const formData = new FormData(disciplineForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
      }).then(response => {
        console.log(response)
        if(response.ok){
          closeDisciplineModal();
          document.location.reload();
        }
      })
      .catch(error => {
        closeDisciplineModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
      })
  });
};

const deleteDiscipline = async (disciplineId) => {
  fetch(`http://localhost:3000/disciplinas/${disciplineId}`, {
    method: 'DELETE'
  }).then(document.location.reload());  
}

const createDiscipline = () => {
  openDisciplineModal();
  disciplineModalTitle.textContent = 'Nova Discipline';
  saveDisciplineButton.textContent = 'Criar';
  saveDisciplineData('http://localhost:3000/disciplinas', 'POST');
};

const editDiscipline = async (disciplineId) => {
  const url = `http://localhost:3000/disciplinas/${disciplineId}`;
  openDisciplineModal();
  disciplineModalTitle.textContent = 'Editar Disciplina';
  saveDisciplineButton.textContent = 'Editar';
  const [name, cargaHoraria, professor, observacos] = document.querySelectorAll('input');
  const selectStatus = document.querySelector("#status");
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      name.value = data.nome
      cargaHoraria.value = data.cargaHoraria
      professor.value = data.professor
      observacos.value = data.observacos
      selectStatus.value = data.selectStatus
    })
    saveDisciplineData(url, 'PUT');
};

loadStudentTable();
loadDisciplineTable();