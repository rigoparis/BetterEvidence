import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import cursedPossessionsInfo from '../../../jsonInfo/cursedPossessionsInfo.json';
import {isArray, join} from 'lodash';

const bulletColors = ['#00BFFF', '#FFA500', '#CCCCCC'];

function CursedPossessionsInfo() {
  const [activeSections, setActiveSections] = useState([]);
  const [multipleSelect, setMultipleSelect] = useState(true);

  renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  renderContent = (section) => {
    return (
      <View style={styles.content}>
        {section.content.uses && (
          <Text style={styles.contentSubheader}>Uses</Text>
        )}
        {section.content.uses &&
          section.content.uses.map((use, key) => (
            <Text style={styles.contentText} key={key}>
              {`\u2022 ${use}`}
            </Text>
          ))}
        {section.content.facts && (
          <Text style={styles.contentSubheader}>Facts</Text>
        )}
        {section.content.facts &&
          section.content.facts.map((fact, key) => (
            <Text style={styles.contentText} key={key}>{`\u2022 ${fact}`}</Text>
          ))}
        {section.content.questions && (
          <Text style={styles.contentSubheader}>Questions</Text>
        )}
        {section.content.questions &&
          section.content.questions.map((questionGroup, key) => (
            <View styles={styles.questionGroupContainer} key={key}>
              <Text style={styles.categoryHeader}>
                {questionGroup.category}
              </Text>
              <View style={styles.categoryInformationContainer}>
                <Text style={styles.categoryInformationSubheader}>
                  Description
                </Text>
                <Text style={[styles.questionGroupItem, styles.contentText]}>
                  {questionGroup.description}
                </Text>
                <Text style={styles.categoryInformationSubheader}>
                  Questions
                </Text>
                <View style={styles.questionGroupItem}>
                  {isArray(questionGroup.questions[0]) && (
                    <Text style={styles.bulletDisclaimer}>
                      Bullet color match between questions and answers
                    </Text>
                  )}
                  {questionGroup.questions.map((question, groupkey) => (
                    <View
                      key={groupkey}
                      style={isArray(question) ? {marginBottom: 8} : {}}>
                      {isArray(question) &&
                        question.map((subquestions, key) => (
                          <View
                            key={key}
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 2,
                            }}>
                            <Text
                              style={{
                                fontSize: 60,
                                margin: -22.5,
                                marginLeft: 8,
                                color: `${bulletColors[groupkey]}`,
                              }}>{`\u2022 `}</Text>
                            <Text style={styles.contentText}>
                              {subquestions}
                            </Text>
                          </View>
                        ))}
                      {!isArray(question) && (
                        <Text style={styles.contentText}>{question}</Text>
                      )}
                    </View>
                  ))}
                </View>
                <Text style={styles.categoryInformationSubheader}>Answers</Text>
                <View style={styles.questionGroupItem}>
                  {isArray(questionGroup.answers[0]) && (
                    <Text style={styles.bulletDisclaimer}>
                      Bullet color match between questions and answers
                    </Text>
                  )}
                  {questionGroup.answers.map((answer, groupkey) => (
                    <View
                      key={groupkey}
                      style={isArray(answer) ? {marginBottom: 8} : {}}>
                      {isArray(answer) &&
                        answer.map((subanswers, key) => (
                          <View
                            key={key}
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 2,
                            }}>
                            <Text
                              style={{
                                fontSize: 60,
                                margin: -22.5,
                                marginLeft: 8,
                                color: `${bulletColors[groupkey]}`,
                              }}>{`\u2022 `}</Text>
                            <Text style={styles.contentText}>{subanswers}</Text>
                          </View>
                        ))}
                      {!isArray(answer) && (
                        <Text style={styles.contentText}>{answer}</Text>
                      )}
                    </View>
                  ))}
                </View>
                <Text style={styles.categoryInformationSubheader}>
                  Sanity Drain
                </Text>
                <Text style={[styles.questionGroupItem, styles.contentText]}>
                  {questionGroup.sanityDrain}%
                </Text>
                <Text style={styles.categoryInformationSubheader}>
                  Has text option
                </Text>
                <Text style={[styles.questionGroupItem, styles.contentText]}>
                  {questionGroup.hasTextOption ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
          ))}
        {section.content.cards && (
          <Text style={styles.contentSubheader}>Cards</Text>
        )}
        {section.content.cards &&
          section.content.cards.map((card, key) => (
            <View styles={styles.questionGroupContainer} key={key}>
              <Text style={styles.categoryHeader}>{card.name}</Text>
              <View style={styles.categoryInformationContainer}>
                <Text style={styles.categoryInformationSubheader}>
                  Chance to draw:
                </Text>
                <Text style={[styles.questionGroupItem, styles.contentText]}>
                  {card.chanceToDraw}
                </Text>
                <Text style={styles.categoryInformationSubheader}>Effect:</Text>
                <Text style={[styles.questionGroupItem, styles.contentText]}>
                  {card.effect}
                </Text>
              </View>
            </View>
          ))}
        {section.content.wishes && (
          <Text style={styles.contentSubheader}>Wishes</Text>
        )}
        {section.content.wishes &&
          section.content.wishes.map((wishObj, key) => (
            <View styles={styles.questionGroupContainer} key={key}>
              <Text style={styles.categoryHeader}>"{wishObj.wish}"</Text>
              <View style={styles.categoryInformationContainer}>
                <Text style={styles.categoryInformationSubheader}>
                  Possitive Effect(s)
                </Text>
                {wishObj.positiveEffects.map((effect, key) => (
                  <Text
                    style={[styles.questionGroupItem, styles.contentText]}
                    key={key}>
                    {effect}
                  </Text>
                ))}
              </View>
              <View style={styles.categoryInformationContainer}>
                <Text style={styles.categoryInformationSubheader}>
                  Negative Effect(s)
                </Text>
                {wishObj.negativeEffects.map((effect, key) => (
                  <Text
                    style={[styles.questionGroupItem, styles.contentText]}
                    key={key}>
                    {effect}
                  </Text>
                ))}
              </View>
              {wishObj.note && (
                <View style={styles.categoryInformationContainer}>
                  <Text style={styles.categoryInformationSubheader}>Note:</Text>
                  <Text style={[styles.questionGroupItem, styles.contentText]}>
                    {wishObj.note}
                  </Text>
                </View>
              )}
            </View>
          ))}
      </View>
    );
  };

  updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.accordionTitleContainer}>
        <Text style={styles.accordionTitle}>Cursed Possessions</Text>
      </View>
      <Accordion
        activeSections={activeSections}
        sections={cursedPossessionsInfo}
        touchableComponent={TouchableOpacity}
        expandMultiple={multipleSelect}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </ScrollView>
  );
}

export default CursedPossessionsInfo;

const styles = StyleSheet.create({
  container: {backgroundColor: '#000', height: '100%'},
  content: {marginHorizontal: 30, paddingVertical: 10},
  accordionTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  accordionTitle: {
    color: '#446D92',
    fontSize: 40,
    marginVertical: 10,
    fontFamily: 'PermanentMarker-Regular',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: '#446D92',
    borderWidth: 1.0,
    borderStyle: 'solid',
    paddingVertical: 5,
  },
  headerText: {
    color: '#C6CACE',
    fontSize: 36,
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  contentSubheader: {
    color: '#446D92',
    fontSize: 26,
  },
  contentText: {fontSize: 18, marginLeft: 10, color: '#C6CACE'},
  bulletDisclaimer: {
    fontSize: 14,
    marginLeft: 10,
    color: '#C6CACE',
    marginVertical: 3,
  },
  categoryHeader: {color: '#698aa7', fontSize: 22, marginLeft: 10},
  categoryInformationContainer: {marginLeft: 30},
  categoryInformationSubheader: {
    color: '#8ea7bd',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
