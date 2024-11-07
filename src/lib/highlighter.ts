import { getSingletonHighlighterCore, getTokenStyleObject, type HighlighterCore, type ThemedToken } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

export const theme = {
  name: 'vortico',
  settings: [
    {
      scope: ['markup.changed', 'markup.deleted', 'markup.inserted', 'punctuation', 'variable', 'constant', 'source'],
      settings: {
        foreground: '#aaabb6', // Primary light
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#3f3f46', // Primary dark
      },
    },
    {
      scope: [
        'constant.character.character-class.regexp',
        'constant.character.set.regexp',
        'constant.language',
        'constant.numeric',
        'constant.other.character-class.regexp',
        'constant.other.character-class.set.regexp',
        'constant.other.color.rgb-value',
        'constant.other.rgb-value',
        'constant.regexp',
        'constant.sha.git-rebase',
        'invalid',
        'meta.class',
        'meta.function-call.generic',
        'support.function.git-rebase',
        'token.error-token',
      ],
      settings: {
        foreground: '#9e744f', // Bosque
      },
    },
    {
      scope: [
        'keyword',
        'meta.structure.dictionary.key.python',
        'support.class',
        'support.function',
        'support.type',
        'support.type.vendored.property-name',
        'support.type.property-name',
        'storage',
      ],
      settings: {
        foreground: '#e25822', // Flama
      },
    },
    {
      scope: [
        'meta.attribute',
        'meta.definition',
        'meta.indexed-name',
        'punctuation.character.set.begin.regexp',
        'punctuation.character.set.end.regexp',
        'punctuation.definition.character-class.regexp',
        'punctuation.definition.group.regexp',
        'punctuation.definition.group.assertion.regexp',
        'punctuation.definition.template-expression.begin',
        'punctuation.definition.template-expression.end',
        'support.other.parenthesis.regexp',
      ],
      settings: {
        foreground: '#00bbd5', // Bruma
      },
    },
    {
      scope: [
        'string',
        'string.tag',
        'string.value',
        'string.regexp',
        'string.quoted',
        'punctuation.definition.string',
      ],
      settings: {
        foreground: '#00976e', // Ciclon
      },
    },
    {
      scope: ['header', 'variable.language', 'variable.other.enummember', 'variable.parameter', 'entity.name.function'],
      settings: {
        foreground: '#008080', // Vortico
      },
    },
    {
      scope: [
        'emphasis',
        'markup.bold',
        'markup.changed',
        'markup.deleted',
        'markup.heading',
        'markup.inserted',
        'markup.italic',
        'markup.strikethrough',
        'meta.template.expression',
        'punctuation.definition.quote.begin.markdown',
        'punctuation.definition.list.begin.markdown',
      ],
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      scope: ['strong'],
      settings: {
        fontStyle: 'bold',
      },
    },
  ],
}

export function tokenStyle(token: ThemedToken) {
  return getTokenStyleObject(token)
}

let highlighter: HighlighterCore

export default async function getHighlighter() {
  if (highlighter === undefined)
    highlighter = await getSingletonHighlighterCore({
      themes: [theme],
      langs: [
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/console.mjs'),
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/python.mjs'),
        import('shiki/langs/toml.mjs'),
      ],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })

  return highlighter
}
