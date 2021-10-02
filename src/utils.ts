import * as fs from 'fs'

const extractDataSourceBlock = (schema: string): string | undefined =>
	schema.split('datasource db {')[1]?.split('}')[0]


export const getDatabaseEngineFromSchema = (schema: string): string | undefined => {
	const dataSourceBlock = extractDataSourceBlock(schema)
	return dataSourceBlock ? /provider\s*=\s*"(.+)"/.exec(dataSourceBlock)?.pop() : undefined
}

export const getDatabaseUrlEnvVarNameFromSchema = (schema: string): string | undefined => {
	const dataSourceBlock = extractDataSourceBlock(schema)
	return dataSourceBlock ? /url\s*=\s*env\("(.+)"\)/.exec(dataSourceBlock)?.pop() : undefined
}

export const copyFile = async (source: string, dest: string) => {
	if (fs.existsSync(dest)) {
		await new Promise(resolve => fs.rm(dest, resolve))
	}
	await new Promise(resolve => fs.copyFile(source, dest, resolve))
}
