interface Student {
	name: string,
	age: number,
}

const studentsList: Student[] = [
    {name: 'john', age: 30},
    {name: 'mark', age: 30},
]

for (const student of studentsList) {
    console.log(`${student.name} ${student.age}`)
}