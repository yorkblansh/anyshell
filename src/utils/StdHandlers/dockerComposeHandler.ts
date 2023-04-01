import { StdHandler } from '../../interfaces/StdHandler.interface.js'
import _ from 'lodash'

interface ContainerBuildStepInfo {
	globalStep: string
	imageName: string
	currentImageSteps?: {
		currentStep: string
		totalSteps: string
	}
}

export interface DockerComposeExecutorCallbackProps {
	dockerComposeExitCode?: number
	dockerComposePercent?: number
}

export const dockerComposeHandler: StdHandler = (
	childProcess,
	callback,
	logger,
) => {
	const containersInfo = new Map<string, ContainerBuildStepInfo>()

	childProcess.on('close', (code, signal) => {
		if (code !== null) callback({ exitCode: code })
	})
	childProcess.stdout?.on('data', (chunk) => {
		logger().log({ chunk })
		const stepList = containersBuildStepList(chunk)
		const percents = getDockerComposeProcessPercents(stepList, containersInfo)
		if (percents) callback({ percentage: percents })
	})
}

const getDockerComposeProcessPercents = (
	stepList: (ContainerBuildStepInfo | undefined)[] | undefined,
	containersInfo: Map<string, ContainerBuildStepInfo>,
) => {
	let totalSteps: number = 0

	if (stepList) {
		stepList.map((containerBuildStepInfo) => {
			if (containerBuildStepInfo && containerBuildStepInfo.currentImageSteps) {
				totalSteps = Number(containerBuildStepInfo.currentImageSteps.totalSteps)
				containersInfo.set(
					containerBuildStepInfo.imageName,
					containerBuildStepInfo,
				)
			}
		})
	}

	if (containersInfo.size !== 0 && totalSteps !== 0) {
		const avegareCurrentStep = _.mean(
			Array.from(containersInfo)
				.map(([v, a]) => a.currentImageSteps!.currentStep)
				.map(Number),
		)
		return _.round((avegareCurrentStep / totalSteps) * 100)
	}
}

const containersBuildStepList = (data: string) => {
	// example of regexp below: [ `#12 [image-name 4/6]` ]
	const matchList = data.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm)
	return matchList
		?.map((match) => match.replace(/\[/g, '').replace(/\]/g, ''))
		.map((match) => {
			const matchElements = match.split(' ')

			if (matchElements.length === 3) {
				return matchElements.map(
					(): ContainerBuildStepInfo => ({
						globalStep: matchElements[0],
						imageName: matchElements[1],
						currentImageSteps: matchElements[2]
							.trim()
							.split('/')
							.map((v, i, stepValues) => {
								if (stepValues.length === 2)
									return {
										currentStep: stepValues[0],
										totalSteps: stepValues[1],
									}
							})[0],
					}),
				)
			}
		})
		.flat()
}
