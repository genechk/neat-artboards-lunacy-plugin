import { getSelectedDocument } from 'sketch/dom'
import { getInputFromUser, INPUT_TYPE } from 'sketch/ui'
import {
	getAllArtboardsOnPage,
	getAllArtboardsInTheDocument,
} from '../main/get-artboards'
import { arrangeIntoGrid } from '../main/arrange-into-grid'
import { setNewPage } from '../main/set-new-page'

export default function () {
	// Select scope
	getInputFromUser(
		'Which pages do you want to process?',
		{
			type: INPUT_TYPE.selection,
			possibleValues: [
				'Current Page',
				'Each Page',
				'All Pages (moves all artboards to new page)',
			],
			initialValue: 'Current Page',
		},
		(err, targetPages) => {
			if (err) {
				return
			}

			// Columns
			getInputFromUser(
				'Set number of columns',
				{
					description:
						'Artboards will be arranged into grid based on that number',
					initialValue: 8,
					type: INPUT_TYPE.string,
				},
				(err, cols) => {
					if (err) {
						return
					}

					// Gutter
					getInputFromUser(
						'Set gutter',
						{
							description: 'Controls distance between artboards',
							initialValue: 40,
							type: INPUT_TYPE.string,
						},
						(err, gutter) => {
							if (err) {
								return
							}

							// Process all accumulated values
							const document = getSelectedDocument()
							switch (targetPages) {
								case 'All Pages (moves all artboards to new page)':
									// Gutter
									getInputFromUser(
										'New page name',
										{
											description:
												'You can specify the existing page name and all artboards will be moved there instead',
											initialValue: 'Artboards',
											type: INPUT_TYPE.string,
										},
										(err, pageName) => {
											if (err) {
												return
											}
											const artboards = Array.from(
												getAllArtboardsInTheDocument(document, pageName)
											)
											const parent = setNewPage(document)
											arrangeIntoGrid(
												artboards,
												+cols,
												null,
												+gutter,
												parent
											)
										}
									)

									break
								case 'Each Page':
									document.pages.forEach(page => {
										const artboards = Array.from(
											getAllArtboardsOnPage(page)
										)
										arrangeIntoGrid(artboards, +cols, null, +gutter)
									})
									break
								case 'Current Page':
								default:
									const page = document.selectedPage
									const artboards = Array.from(getAllArtboardsOnPage(page))
									arrangeIntoGrid(artboards, +cols, null, +gutter)
									break
							}

							// TODO: Add sorting, hierarchical arrangement and calculations based on number of rows
						}
					)
				}
			)
		}
	)
}
